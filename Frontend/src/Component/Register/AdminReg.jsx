import React, { useEffect, useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { BsCheck2All } from 'react-icons/bs';

const AdminReg = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        password2: ''
    });
    const [uCase, setUCase] = useState(false);
    const [num, setNum] = useState(false);
    const [sChar, setSChar] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formValidMessage, setFormValidMessage] = useState(false)

    const timesIcon = <FaTimes color='red' size={20}/>
    const checkIcon = <BsCheck2All color='green' size={20}/>

    const switchIon = (condition) => {
        return condition ? checkIcon : timesIcon
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}))
    }

    useEffect(() => {
        const password = formData.password;
        setUCase(/([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password));
        setNum(/([0-9])/.test(password));
        setSChar(/([!,%,&,@,#,$,_,*])/.test(password));
        setPasswordLength(password.length > 5);
    }, [formData.password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false)
        }, 4000);
    }

  return (
    <div className='container form__ --100vh'>
       <div className="form-container">
       <p className='title'>Create an Account</p>
        <form className='form' onSubmit={handleSubmit}>
            <div className="--dir-column">
                <label htmlFor="fullname">Full Name:</label>
                <input type="text" className='input' name='fullname' placeholder='Enter Your Full Name' onChange={handleInputChange} required />
            </div>
            
            <div className="--dir-column">
                <label htmlFor="email">Email:</label>
                <input type="email" className='input' name='email' placeholder='Enter Your Email' onChange={handleInputChange} required />
            </div>

            <div className="--dir-column">
                <label htmlFor="password">Password:</label>
                <input type="password" className='input' name='password' placeholder='Enter Your Password' onChange={handleInputChange} required />
            </div>
            
            <div className="--dir-column">
                <label htmlFor="password">Confirm Password:</label>
                <input type="password" className='input' name='password2' placeholder='Comfirm Password' onChange={handleInputChange} required />
            </div>

            <div className="card">
                <ul>
                    <li className="indicator"><span>{switchIon(uCase)}&nbsp; Lowercase & Uppercase</span></li>
                    <li className="indicator"><span>{switchIon(num)}&nbsp; Number (0 - 9)</span></li>
                    <li className="indicator"><span>{switchIon(sChar)}&nbsp; Special Characters (!,%,&,@,#,$,_,*)</span></li>
                    <li className="indicator"><span>{switchIon(passwordLength)}&nbsp; Minimum of 6 characters</span></li>
                </ul>
            </div>
            <button disabled={isSubmitting
                
            } className='--btn'>{isSubmitting ? 'Signing you up...' : 'Create Account'}</button>
        </form>
        <p className='account'>Already have an account? <Link to='/login'>Login</Link> </p>
       </div>
    </div>
  )
}
         
export default AdminReg