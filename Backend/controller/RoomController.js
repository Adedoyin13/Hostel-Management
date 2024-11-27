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

module.exports = {createNewRoom}






