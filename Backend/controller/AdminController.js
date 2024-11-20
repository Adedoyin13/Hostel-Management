const adminModel = require('./../models/AdminModel');
const generateToken = require('./../utils/index');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const register = asyncHandler(async(req, res) => {
    try {
        const {fullname, email, password} = req.body;
        if(!fullname || !email || !password) {
            res.status(400)
            throw new Error('All fields are required')
        } else if (password.length < 8)  {
            res.status(400);
            throw new Error('Minimum of six characters');
        } else if (password.length > 20) {
            res.status(400);
            throw new Error('Maximum of twenty characters');
        }

        // check if admin already exists
        
        const adminExists = await adminModel.findOne({ email })
        if(adminExists) {
            res.status(400)
            throw new Error('Email aleady exists');
        }

        // create a new admin in the database
        const admin = adminModel.create({fullname, email, password})

        // Generate JWT token for new admin
        const token = generateToken(admin._id);

        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),   //expires within 24hrs
            sameSite: 'none',
            secure: true
        })

        // Send a success response with admin details and token

        if(admin) {
            const { _id, fullname, email, role } = admin;
            res.status(201).json({_id, fullname, email, role})
        } else {
            res.status(400);
            throw new Error('Invalid Data')
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error!')
    }
})
module.exports = {
    register
} 
