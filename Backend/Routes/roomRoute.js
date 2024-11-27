const express = require('express');
const router = express.Router();

const {createNewRoom, getAllRooms, getRoom, deleteRoom} = require('../controller/RoomController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/create-room', protectAdmin, createNewRoom)
router.get('/', protectAdmin, getAllRooms)
router.get('/:_id', protectAdmin, getRoom)
router.delete('/:roomId', protectAdmin, deleteRoom)



module.exports = router



