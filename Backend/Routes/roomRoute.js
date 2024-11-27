const express = require('express');
const router = express.Router();

const {createNewRoom} = require('../controller/RoomController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/create-room', protectAdmin, createNewRoom)



module.exports = router



