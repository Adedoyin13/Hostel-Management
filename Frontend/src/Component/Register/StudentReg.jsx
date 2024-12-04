import React, { useContext, useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import {ClipLoader} from 'react-spinners';
import { toast } from 'react-toastify';
// import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const override = {
    display: 'block',
    margin: '100px auto',
}

const StudentReg = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        roomNumber: '',
        gender: '',
        nationality: '',
        g_Name: '',
        g_Email: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}))
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();

       try {
        const {name, email, age, roomNumber, nationality, gender, g_Name, g_Email} = formData;

        if(!name || !email || !age || !roomNumber || !nationality || !gender  || !g_Name  || !g_Email) {
            toast.error('OOps, All fields are required');
            return;
        }
       
        setIsSubmitting(true);
        // setLoading(true);

        const response = await axios.post('http://localhost:5000/student/register-student', formData, {withCredentials: true});

        if(response?.data) {
            setLoading(false)
            setUser(response.data)
            setIsSubmitting(false)
            setFormCompleted(true);
            toast.success('Student added successfully');
            navigate('/student-dash')
        }
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
        const message = error?.response?.data?.msg ? `${error.response.data.msg}` : 'Internal server error'
       } finally {
        setLoading(false)
        setIsSubmitting(false)
       }
    }
  return (
   <>
    {loading ? (<ClipLoader color='1a80e5' cssOverride={override} loading={loading}/>) : (
         <div className='container form__ --100vh'>
         <div className="form-container">
         <p className='title'>Register a new student</p>
          <form className='form' onSubmit={handleSubmit}>
              <div className="--dir-column">
                  <label htmlFor="name">Student's Name:</label>
                  <input type="text" className='input' name='name' placeholder='Enter Your Full Name' required onChange={handleInputChange} value={formData.name}/>
              </div>

              <div className="--dir-column">
                  <label htmlFor="email">Contact Email:</label>
                  <input type="email" className='input' name='email' placeholder='Enter Your Email' required onChange={handleInputChange} value={formData.email}/>
              </div>
              
              <div className="--dir-column">
                  <label htmlFor="number">Age:</label>
                  <input type="number" className='input' name='age' placeholder='Enter Your Age' required onChange={handleInputChange} value={formData.age}/>
              </div>

                <div>
                  <label htmlFor="gender">Gender:</label>
                  <select name='gender' className='input' value={formData.gender} required onChange={handleInputChange}>
                    <option value={'select'}>Select gender</option>
                    <option value={'Male'}>Male</option>
                    <option value={'Female'}>Female</option>
                    <option value={'others'}>Others</option>
                  </select>
              </div>
              
                <div>
                  <label htmlFor="nationality">Nationality:</label>
                  <input type="text" className='input' name='nationality' placeholder='Enter Your Nationality' required onChange={handleInputChange} value={formData.nationality}/>
              </div>
  
              <div className="--dir-column">
                  <label htmlFor="number">Room Number:</label>
                  <input type="number" className='input' name='roomNumber' placeholder='Enter Your Room Number' required onChange={handleInputChange} value={formData.roomNumber}/>
              </div>

              <div className="--dir-column">
                  <label htmlFor="name">Guardian's Name:</label>
                  <input type="name" className='input' name='g_Name' placeholder='Enter Name' required onChange={handleInputChange} value={formData.g_Name}/>
              </div>
              
              <div className="--dir-column">
                  <label htmlFor="email">Guardian's Contact Email:</label>
                  <input type="email" className='input' name='g_Email' placeholder='Enter Email' required onChange={handleInputChange} value={formData.g_Email}/>
              </div>

                <button disabled={isSubmitting} className='--btn'>{isSubmitting ? 'Adding Student...' : 'Add Student'}</button>
          </form>
         </div>
      </div>
    )}
   </>
  )
}
         
export default StudentReg;