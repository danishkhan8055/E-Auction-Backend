// //Require Mongoose
// import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

// const ProductSchema = mongoose.Schema({
//   _id: Number,
//   ptitle: {
//     type: String,
//     required: [true,"Product title is required"],
//     lowercase: true,
//     trim: true,
//   },
//   catnm: {
//     type: String,
//     required: [true,"Category name is required"],
//     lowercase: true,
//     trim: true,
//   },
//   subcatnm: {
//     type: String,
//     required: [true,"SubCategory name is required"],
//     lowercase: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: [true,"SubCategory name is required"],
//     lowercase: true,
//     trim: true,
//   },
//   baseprice: {
//     type: Number,
//     required: [true,"Base price is required"],
//   },	
//   piconnm: {
//     type: String,
//     required: [true,"Product icon is required"],
//     trim: true
//   },
//   uid: {
//     type: String,
//     required: [true,"Username is required"],
//   },
//   info: {
//     type: String,
//     required: [true,"Time is required"],
//   }
// });

// // Apply the uniqueValidator plugin to UserSchema.
// ProductSchema.plugin(uniqueValidator);

// // compile schema to model
// const ProductSchemaModel = mongoose.model('Product_collection',ProductSchema);

// export default ProductSchemaModel




// Require Mongoose
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProductSchema = mongoose.Schema({
  _id: Number,
  ptitle: {
    type: String,
    required: [true, "Product title is required"],
    trim: true,
  },
  catnm: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
  },
  subcatnm: {
    type: String,
    required: [true, "Subcategory name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"], // Fixed error message
    trim: true,
  },
  baseprice: {
    type: Number,
    required: [true, "Base price is required"],
    min: [1, "Base price must be at least 1"], // Prevents negative or zero prices
  },
  piconnm: {
    type: String,
    required: [true, "Product image is required"],
    trim: true,
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId, // Changed from String to ObjectId (better for references)
    required: [true, "User ID is required"],
    ref: "User_collection", // Links to the User collection
  },
  info: {
    type: Date,
    default: Date.now, // Automatically assigns the current timestamp
  }
});

// Apply the uniqueValidator plugin to ProductSchema
ProductSchema.plugin(uniqueValidator);

// Compile schema into model
const ProductSchemaModel = mongoose.model("product_collection", ProductSchema);

export default ProductSchemaModel;
