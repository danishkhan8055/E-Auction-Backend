import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true); // to silence the Mongoose 7 warning
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
};

export default connectDB;
