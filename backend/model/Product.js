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
    }
},
{
    timestamps: true
});

//Compile the Schema to model
const Product = mongoose.model("Product", ProductSchema);
export default Product;
