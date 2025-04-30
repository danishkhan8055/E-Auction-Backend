// //Require Mongoose
// import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

// const SubCategorySchema = mongoose.Schema({
//   _id: Number,
//   subcatnm: {
//     type: String,
//     required: [true,"Sub Category name is required"],
//     lowercase: true,
//     unique: true,
//     trim: true,
//   },
//   catnm: {
//     type: String,
//     required: [true,"Category name is required"],
//     lowercase: true,
//     trim: true,
//   },	
//   subcaticonnm: {
//     type: String,
//     required: [true,"SubCategory icon is required"],
//     trim: true
//   }
// });

// // Apply the uniqueValidator plugin to UserSchema.
// SubCategorySchema.plugin(uniqueValidator);

// // compile schema to model
// const SubCategorySchemaModel = mongoose.model('subcategory_collection',SubCategorySchema);

// export default SubCategorySchemaModel
// Import Mongoose and Unique Validator
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Define SubCategory Schema
const SubCategorySchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  subcatnm: {
    type: String,
    required: [true, "Subcategory name is required"],
    lowercase: true,
    unique: true,
    trim: true
  },
  catnm: {
    type: String,
    required: [true, "Category name is required"],
    lowercase: true,
    trim: true
  },
  subcaticonnm: {
    type: String,
    required: [true, "Subcategory icon is required"],
    trim: true
  }
});

// Apply Unique Validator Plugin
SubCategorySchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

// Compile Schema into Model
const SubCategorySchemaModel = mongoose.model('subcategory_collection', SubCategorySchema);

export default SubCategorySchemaModel;
