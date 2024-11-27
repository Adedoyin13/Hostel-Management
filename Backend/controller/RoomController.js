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
        res.status(500).json({errorMessage: error.message})
    }
})


module.exports = {createNewRoom, getAllRooms, getRoom, deleteRoom}