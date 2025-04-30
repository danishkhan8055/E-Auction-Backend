// //Require Mongoose
// import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

// const UserSchema = mongoose.Schema({
//   _id: Number,
//   name: {
//     type: String,
//     required: [true,"Name is required"],
//     lowercase: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true,"email is required"],
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: [true,"Password is required"],
//     maxlength: 10,
//     minlength:5,
//     trim: true
//   },
//   mobile: {
//     type: String,
//     required: [true,"Mobile is required"],
//     maxlength: 10,
//     minlength:10,
//     trim: true
//   },
//   address: {
//     type: String,
//     required: [true,"Address is required"],
//     trim: true
//   },
//   city: {
//     type: String,
//     required: [true,"City is required"],
//     trim: true
//   },
//   gender: {
//     type: String,
//     required: [true,"Gender is required"],
//   },
//   role: String,
//   status: Number,
//   info: String
// });

// // Apply the uniqueValidator plugin to UserSchema.
// UserSchema.plugin(uniqueValidator);

// // compile schema to model
// const UserSchemaModel = mongoose.model('user_collection',UserSchema);

// export default UserSchemaModel

// Require Mongoose and Validator Plugin
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new mongoose.Schema({
  _id: Number, // Consider using MongoDB's default ObjectId instead of manually managing IDs
  name: {
    type: String,
    required: [true, "Name is required"],
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"] // Email validation
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [5, "Password must be at least 5 characters long"],
    trim: true,
    select: true
  },
  mobile: {
    type: String,
    required: [true, "Mobile is required"],
    unique: true,
    trim: true,
    match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"]
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    // enum: ["Male", "Female", "Other"],  Restrict values
  },
  role: {
    type: String,
    default: "user" // Default role to 'user'
  },
  status: {
    type: Boolean, // Changed from Number to Boolean for clarity
    default: false
  },
  info: {
    type: Date, // Changed from String to Date for better handling
    default: Date.now
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Apply the uniqueValidator plugin to UserSchema
UserSchema.plugin(uniqueValidator, { message: "{PATH} already exists." });

// Compile schema to model
const UserSchemaModel = mongoose.model("users", UserSchema);

export default UserSchemaModel;
