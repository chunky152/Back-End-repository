import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Try MongoDB Atlas first
    try {
      const conn = await mongoose.connect(process.env.MONGO_ATLAS_URL);
      console.log('MongoDB Atlas Connected successfully✅✅✅');
      return;
    } catch (atlasError) {
      console.log('Could not connect to MongoDB Atlas, trying local MongoDB...');
    }

    // If Atlas fails, try local MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('Local MongoDB Connected successfully✅✅✅');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
