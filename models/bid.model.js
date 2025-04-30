//Require Mongoose
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const BidSchema = mongoose.Schema({
  _id: Number,
  pid: String,
  uid: {
    type: String,
    required: [true,"User id is required"],
    trim: true
  },
  bidprice: Number,
  info: {
    type: String,
    trim: true
  }
});

// Apply the uniqueValidator plugin to UserSchema.
BidSchema.plugin(uniqueValidator);

// compile schema to model
const BidSchemaModel = mongoose.model('bid_collection',BidSchema);

export default BidSchemaModel