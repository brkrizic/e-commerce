import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: false
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product' 
        },
    ],
    conversations:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation'
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