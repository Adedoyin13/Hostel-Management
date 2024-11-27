const express = require('express');
const router = express.Router();

const { protectAdmin } = require('../middleware/authMiddleware');
const { registerStudent, getAllStudents, getStudent, updateStudentProfile, changeStudentRoom } = require('../controller/StudentController');

router.post('/register-student', protectAdmin, registerStudent)
router.get('/', protectAdmin, getAllStudents)
router.get('/:_id', protectAdmin, getStudent)
router.patch('/:studentId', protectAdmin, updateStudentProfile)
router.put('/change-room', protectAdmin, changeStudentRoom)

module.exports = router