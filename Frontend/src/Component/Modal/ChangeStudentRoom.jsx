import axios from 'axios';
import React, { useState } from 'react'
import { toast } from "react-toastify";

const ChangeStudentRoom = ({student, onClose}) => {
    const [newRoomNum, setNewRoomNum] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        setNewRoomNum(e.target.value);
    }
    // console.log(student);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        try {
            const studentId = student?._id;
            const response = await axios.put('http://localhost:5000/student/change-room', {studentId: studentId, newRoomNum}, { withCredentials: true});
            console.log(response);
            toast.success(response?.data?.message);
            onClose()
        } catch (error) {
            console.log(error);
            toast.error("Failed to change student's room")
        } finally {
            setIsSubmitting(false)
        }
    }
  return (
    <div className='modal'>
        <div className="modal-content">
            <h2>Change Student&apos;s Room</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Room Number</label>
                    <input type="text" value={newRoomNum} onChange={handleChange}/>
                </div>
                <button type='submit'>{isSubmitting ? 'Changing room' : 'Change Room'}</button>
                <button type='button' onClick={onClose}>Close</button>
            </form>
        </div>
    </div>
  )
}

export default ChangeStudentRoom 