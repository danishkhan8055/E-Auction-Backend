// //Require Mongoose
// import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

// const CategorySchema = mongoose.Schema({
//   _id: Number,
//   catnm: {
//     type: String,
//     required: [true,"Category name is required"],
//     lowercase: true,
//     unique: true,
//     trim: true,
//   },
//   caticonnm: {
//     type: String,
//     required: [true,"Category icon is required"],
//     trim: true
//   }
// });

// // Apply the uniqueValidator plugin to UserSchema.
// CategorySchema.plugin(uniqueValidator);

// // compile schema to model
// const CategorySchemaModel = mongoose.model('category_collection',CategorySchema);

// export default CategorySchemaModel


import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const CategorySchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  catnm: {
    type: String,
    required: [true, "Category name is required"],
    lowercase: true,
    unique: true,
    trim: true,
    minlength: 3, // ✅ Ensure category name is at least 3 chars
    maxlength: 50  // ✅ Limit category name length
  },
  caticonnm: {
    type: String,
    required: [true, "Category icon is required"],
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now // ✅ Automatically store creation date
  }
});

// ✅ Apply the uniqueValidator plugin
CategorySchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

// ✅ Compile schema to model
const CategorySchemaModel = mongoose.model('category_collection', CategorySchema);

export default CategorySchemaModel;
