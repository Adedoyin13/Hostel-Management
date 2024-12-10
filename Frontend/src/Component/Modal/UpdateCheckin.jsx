import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UpdateCheckin = ({student, onClose, currentRoomNumber}) => {
    const [action, setAction] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)
    // console.log(student)

    const handleRoomChange = (e) => {
        setRoomNumber(e.target.value)
    }

    const handleActionChange = (e) => {
        setAction(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        try {
            console.log({student})
            const response = await axios.post(`${BASE_URL}/student/check-in-status`, {studentId: student?._id, action, roomNumber: student?.room?.roomNumber}, {withCredentials: true});
            // console.log(response)
            toast.success(response?.data?.message)
            onClose()
        } catch (error) {
            console.error(error?.response?.data?.message)
            toast.error(error?.response?.data?.message)
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <div className='modal'>
        <div className="modal-content">
            <h2>Update Check-In Status</h2>
            <p>Current Status: {student.checkedIn ? 'Checked In' : 'Checked Out'}</p>
            <p>Current Room: {currentRoomNumber || 'Not Assigned'}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Room Number</label>
                    <input className='input' type="number" value={currentRoomNumber || roomNumber} onChange={handleRoomChange}/>
                </div>
                <div>
                    <label>Action</label>
                    <select value={action} onChange={handleActionChange} className='input'>
                        <option value="&nbsp;">Select an action</option>
                        <option value="checkIn" disabled={student.checkedIn}>Check In</option>
                        <option value="checkOut" disabled={!student.checkedIn}>Check Out</option>
                    </select>
                </div>
                <button type='submit'>{isSubmitting ? 'Updating Status' : 'Update Status'}</button>
                <button type='button' onClick={onClose}>Close</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateCheckin;