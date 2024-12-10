import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UpdateStudentProfile = ({student, onClose, updateFilteredData}) => {
  const [formData, setFormData] = useState({
    name: student.name,
    age: student.age,
    nationality: student.nationality,
    g_Name: student.guardian.guardianName,
    g_Email: student.guardian.guardianEmail,
    _id: student._id
});

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev=> ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${BASE_URL}/student/${student._id}`, formData, {withCredentials: true});
      if(response?.data) {
        updateFilteredData((prevData) => [response.data, ...prevData])
        toast.success('Update Successful')
      }
      onClose();
    } catch (error) {
      console.log('Error updating profile', error);
      toast.error('Error updating profile');
    }
  }
  return (
    <div className='modal'>
      <div className="modal-content">
        <h2>Update Student Profile</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Name</label>
            <input type="text" name='name' value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="">Age</label>
            <input type="number" name='age' value={formData.age} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="">Nationality</label>
            <input type="text" name='nationality' value={formData.nationality} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="">Guardian&apos;s Name</label>
            <input type="text" name='g_name'  value={formData.g_Name} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="">Guardian&apos;s Email</label>
            <input type="email" name='g_Email' value={formData.g_Email} onChange={handleChange} />
          </div>

          <button type='submit'>Update</button>
          <button type='button' onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateStudentProfile