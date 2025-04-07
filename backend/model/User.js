import mongoose from "mongoose";

const Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  street: String,
  city: String,
  postalCode: String,
  country: String,
  isDefault: { type: Boolean, default: false }
}, { _id: false });

const UserSchema = new Schema({
    fullname:{
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    addresses: [addressSchema],
    wishlist: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
        }
    ],
    orderHistory: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
        }
    ],
    isAdmin:{
        type: Boolean,
        default: false
    },
}, 
{
    timestamps: true
});

//Compile the schema to model
const User = mongoose.model("User", UserSchema);
export default User;