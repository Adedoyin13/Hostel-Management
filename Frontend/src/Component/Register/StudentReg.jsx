import React from 'react';
import './Register.css';
// import { Link } from 'react-router-dom';

const StudentReg = () => {
  return (
    <div className='container form__ --100vh'>
       <div className="form-container">
       <p className='title'>Register a new student</p>
        <form className='form'>
            <div className="--dir-column">
                <label htmlFor="name">Student's Name:</label>
                <input type="text" className='input' name='fullname' placeholder='Enter Your Full Name' required />
            </div>
            
            <div className="--dir-column">
                <label htmlFor="number">Age:</label>
                <input type="number" className='input' name='number' placeholder='Enter Your Age' required />
            </div>
            
            <div className="--dir-column">
                <label htmlFor="number">Room Number:</label>
                <input type="number" className='input' name='roomNumber' placeholder='Enter Your Room Number' required />
            </div>
            
            <div className="--dir-column">
                <label htmlFor="email">Contact Email:</label>
                <input type="email" className='input' name='email' placeholder='Enter Your Email' required />
            </div>

            <div className="--dir-column">
                <label htmlFor="name">Guardian's Name:</label>
                <input type="name" className='input' name='g_Name' placeholder='Enter Name' required />
            </div>
            
            <div className="--dir-column">
                <label htmlFor="email">Guardian's Contact Email:</label>
                <input type="email" className='input' name='g_Email' placeholder='Enter Email' required />
            </div>
{/* 
            <div className="card">
                <ul>
                    <li className="indicator"><span>&nbsp; Lowercase & Uppercase</span></li>
                    <li className="indicator"><span>&nbsp; Number (0 - 9)</span></li>
                    <li className="indicator"><span>&nbsp; Special Characters (!"£$^&*@~#)</span></li>
                    <li className="indicator"><span>&nbsp; Minimum of 6 characters</span></li>
                </ul>
            </div> */}
            <button className='--btn'>Register</button>
        </form>
       </div>
    </div>
  )
}
         
export default StudentReg;