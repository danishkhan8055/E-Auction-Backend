// import mongoose from 'mongoose';
// const url="mongodb://localhost:27017/eAuction";
// mongoose.connect(url);
// console.log("Successfully connected to mongodb database...");
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const url = process.env.MONGO_URI ; // Use environment variable if available

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("✅ Successfully connected to MongoDB database...");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1); // Exit process if connection fails
    }
};

// Call the function to connect to DB
connectDB();

export default mongoose;
