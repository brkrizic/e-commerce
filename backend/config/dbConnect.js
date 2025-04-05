import mongoose from "mongoose";
import 'dotenv/config';

const dbConnect = async () => {
    try {
        const connected = await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=${process.env.DB_DATABASE}`);
        mongoose.set('strictQuery', true);
        console.log(`Mongodb connected ${connected.connection.host}`);        
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

export default dbConnect;