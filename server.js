import express, { json } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(json());

// Basic route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});