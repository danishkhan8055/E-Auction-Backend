import express from 'express';
import cors from 'cors';
import fileupload from 'express-fileupload';
import dotenv from "dotenv"

// Import API routes
import userRouter from './routes/user.router.js';
import categoryRouter from './routes/category.router.js';
import subCategoryRouter from './routes/subcategory.router.js';
import productRouter from './routes/product.router.js';
import bidRouter from './routes/bid.router.js';
import connectDB from './models/connection.js';

const app = express();
connectDB();
dotenv.config();
// ✅ Enable CORS for cross-origin requests
app.use(cors({
    origin: 'https://e-auction-v1t6.onrender.com', // your frontend URL
    credentials: true
  }));

// ✅ Built-in Express body parsing (no need for body-parser)
app.use(express.json());  // For JSON requests
app.use(express.urlencoded({ extended: true }));  // For form-urlencoded data

// ✅ Middleware for file uploads
app.use(fileupload());

// ✅ Route-level middleware for different API routes
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subCategoryRouter);
app.use("/product", productRouter);
app.use("/bid", bidRouter);

// ✅ Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
