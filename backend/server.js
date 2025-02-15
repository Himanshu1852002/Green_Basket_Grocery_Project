import express from 'express';
import { connectDataBase } from './config/database.js'
import userRouter from './routes/userRoute.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cors from 'cors'
import 'dotenv/config';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import wishlistRouter from './routes/wishlistRoute.js'
import orderRouter from './routes/orderRoute.js';
import searchRouter from './routes/searchRoute.js'


// app config
const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());
app.use(cors({
    origin: ["https://green-basket-grocery-project.vercel.app"], // Vercel Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));



// database connection
connectDataBase();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// api middleware
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/orders', orderRouter);
app.use('/api/search', searchRouter);


app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`)
})