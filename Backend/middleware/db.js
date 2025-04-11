import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';

configDotenv();
const { MONGO_URI } = process.env;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        mongoose.connection.emit('connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

export default connectDB;