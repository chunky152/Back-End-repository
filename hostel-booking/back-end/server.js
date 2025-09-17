import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

//database connection
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
.catch(err => {
  console.error('MongoDB connection error:', err);
});
