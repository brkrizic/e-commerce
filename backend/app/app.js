import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import { globalErrorHandler, notFound } from '../middlewares/globalErrorHandler.js';
import productRoutes from '../routes/productsRoute.js';
import conversationRoute from '../routes/conversationRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import categoryRoutes from '../routes/categoryRoute.js';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

dbConnect();
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const publicDir = '../public';

// Check if the folder exists, if not, create it
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log('Uploads folder created!');
} else {
  console.log('Uploads folder already exists');
};

app.use('/public', express.static(path.resolve('public')));
console.log('Public folder path:', path.resolve('public'));


app.use(cookieParser());

app.get("/home", (req, res) => {
    res.status(200).send("<h1>Hello world</h1>");
})

app.use('/api/v1/users', userRoutes);
app.use(productRoutes);
app.use(conversationRoute);
app.use(categoryRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;