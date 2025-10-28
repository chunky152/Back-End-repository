import express, { json } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Loading environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(json());

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/admin', adminRoutes); 

app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});