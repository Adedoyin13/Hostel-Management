require('dotenv').config();
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 5000;
const AdminRoute = require('./Routes/AdminRoute')
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin")
    next()
})

app.use('/admin', AdminRoute)

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
}))

app.get('/', (req, res) => console.log('Success'));

connectDB();
app.use(errorHandler);
mongoose.connection.once('open', () => {
    console.log('DataBase Connected!');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})