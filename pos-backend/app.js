require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const config = require('./config/config');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const createHttpError = require('http-errors');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');



const PORT = process.env.PORT;
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

const allowedOrigins = [
  'https://classy-moxie-5c2a08.netlify.app',
  'http://localhost:8000' // Cho môi trường dev
];

app.use(cors({
    credentials: true,
    // origin: ['https://localhost:5173']
    // origin: true,
    origin: allowedOrigins,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Root Endpoint
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the POS system backend server!" });
});

// Other end points 
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/order', require('./routes/orderRoute'));
app.use('/api/table', require('./routes/tableRoute'));

//Global Error Handler
app.use(globalErrorHandler)

// Start the server 
app.listen(PORT, () => {
    console.log(`✅ POS Server is running on port ${PORT}`);
})



