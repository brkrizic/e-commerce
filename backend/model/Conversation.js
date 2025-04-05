import mongoose from "mongoose";

const Schema = mongoose.Schema;

const  ConversationSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    messages: [
        {
            message: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
{
    timestamps: true
});

//Compile the Schema to model
const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;
