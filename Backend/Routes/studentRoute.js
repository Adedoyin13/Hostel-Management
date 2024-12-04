const express = require('express');
const router = express.Router();

const { protectAdmin } = require('../middleware/authMiddleware');
const { registerStudent, getAllStudents, getStudent, updateStudentProfile, changeStudentRoom, updateCheckInStatus, deleteStudent } = require('../controller/StudentController');

router.post('/register-student', protectAdmin, registerStudent)
router.get('/', getAllStudents)
router.get('/:_id', protectAdmin, getStudent)
router.patch('/:studentId', protectAdmin, updateStudentProfile)
router.put('/change-room', protectAdmin, changeStudentRoom)
router.post('/check-in-status', protectAdmin, updateCheckInStatus)
router.delete('/:studentId', protectAdmin, deleteStudent)

module.exports = router