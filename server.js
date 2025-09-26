import express, { json } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());

// Basic route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});