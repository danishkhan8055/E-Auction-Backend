// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import fileupload from 'express-fileupload';


// const app=express();

// //import api routers
// import userRouter from './routes/user.router.js';
// import categoryRouter from './routes/category.router.js';
// import subCategoryRouter from './routes/subcategory.router.js';
// import productRouter from './routes/product.router.js';
// import bidRouter from './routes/bid.router.js';

// //configuration to accept cross site request
// app.use(cors());

// //to extract body data from request (POST , PUT , DELETE , PATCH)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

// //configuration to accept file data
// app.use(fileupload());

// //route level middleware to load api router
// app.use("/user",userRouter);
// app.use("/category",categoryRouter);
// app.use("/subcategory",subCategoryRouter);
// app.use("/product",productRouter);
// app.use("/bid",bidRouter);
    
// app.listen(3001);
// console.log("server invoked at link http://localhost:3001");


import express from 'express';
import cors from 'cors';
import fileupload from 'express-fileupload';

// Import API routes
import userRouter from './routes/user.router.js';
import categoryRouter from './routes/category.router.js';
import subCategoryRouter from './routes/subcategory.router.js';
import productRouter from './routes/product.router.js';
import bidRouter from './routes/bid.router.js';

const app = express();

// ✅ Enable CORS for cross-origin requests
app.use(cors());

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
const PORT = 3001
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:3001`));
