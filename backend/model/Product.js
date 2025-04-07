import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        ref: "Category"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number
    },
    isActive: {
        type: Boolean
    },
    dimensions: {
      type: String,  // Format: "Length x Width x Height" (or can be a complex object)
      required: false
    },
    weight: {
      type: Number,  // Weight in kg or lbs, based on your application needs
      required: false
    },
    rating: {
      type: Number, // A value between 0-5, depending on user reviews
      min: 0,
      max: 5,
      default: 0
    },
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'  // Assuming you have a User model to reference
        },
        rating: {
            type: Number,
            required: false,
            min: 0,
            max: 5
        },
        comment: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]

},
{
    timestamps: true
});

//Compile the Schema to model
const Product = mongoose.model("Product", ProductSchema);
export default Product;
