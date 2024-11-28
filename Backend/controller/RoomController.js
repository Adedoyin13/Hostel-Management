const asyncHandler = require('express-async-handler');
const Room = require('./../models/RoomModel');

const createNewRoom = asyncHandler(async(req, res) => {
    const {roomNumber, roomCapacity, roomLocation} = req.body

    try {
        if(!roomNumber || !roomCapacity || !roomLocation) {
            return res.status(400).json({message: 'All fields are required'})
        }
        const roomExist = await Room.findOne({roomNumber: roomNumber});
        if(roomExist) {
            return res.status(400).json({message: 'Room already exists'})
        }

        const room = await Room.create({
            roomNumber: roomNumber,
            roomCapacity,
            roomLocation,
        });
        res.status(201).json(room);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

const getAllRooms = asyncHandler(async(req, res) => {
    // Finds all rooms so new rooms come first
    try {
        const rooms = await Room.find().sort('-createdAt')
    if(!rooms) {
        return res.status(404).json({message: 'No room found'})
    }
    res.status(200).json(rooms)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

const getRoom = asyncHandler(async(req, res) => {
    try {
        const roomId = req.params._id
     const room = await Room.findById(roomId);
     if(room) {
        return res.status(200).json(room)
     } else {
        return res.status(404).json({message: 'Room not found'})
     }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
});


const deleteRoom = asyncHandler(async(req, res) => {
    try {
        const {roomId} = req.params;
        const room = await Room.findById(roomId);
        if(!room) {
            return res.status(404).json({message: 'room not found'})
        }
        await room.deleteOne()
        res.status(200).json({message: 'Room deleted successfully!'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
})


const updateRoom = asyncHandler(async (req, res) => {
    const roomId = req.params.roomId;
    const { roomNumber, roomLocation, roomOccupancy, roomStatus, roomCapacity } =
      req.body;
  
    console.log({ roomOccupancy });
  
    //   console.log({ originalArray });
    try {
      const room = await Room.findById(roomId);
  
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      const currentRoomCapacity = room.roomCapacity;
  
      const existingRoom = await Room.findOne({ roomNumber });
      let originalRoomOccupancyArray;
      if (existingRoom && room._id.toString() !== existingRoom._id.toString()) {
        return res.status(400).json({ message: "Room already exist" });
      }
  
      if (roomOccupancy) {
        originalRoomOccupancyArray = JSON.parse(roomOccupancy);
  
        const isArray = Array.isArray(originalRoomOccupancyArray);
        if (!isArray) {
          return res
            .status(400)
            .json({ message: "Room occupancy should be an array" });
        }
  
        if (
          (roomCapacity && originalRoomOccupancyArray.length > roomCapacity) ||
          (!roomCapacity &&
            originalRoomOccupancyArray.length > currentRoomCapacity)
        ) {
          return res.status(400).json({
            message: "Room occupancy should be less than room capacity",
          });
        }
      }
  
      room.roomNumber = roomNumber || room.roomNumber;
      room.roomCapacity = roomCapacity || room.roomCapacity;
      room.roomLocation = roomLocation || room.roomLocation;
      room.roomOccupancy = originalRoomOccupancyArray || room.roomOccupancy;
      room.roomStatus = roomStatus || room.roomStatus;
      await room.save();
      res.status(200).json(room);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  


module.exports = {createNewRoom, getAllRooms, getRoom, deleteRoom, updateRoom}