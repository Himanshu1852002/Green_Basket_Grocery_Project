import express from 'express';
import { connectDataBase } from './config/database.js'
import userRouter from './routes/userRoute.js';
import cors from 'cors'
import 'dotenv/config';


// app config
const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());
app.use(cors());


// api middleware
app.use('/api/user', userRouter);


// database connection
connectDataBase();


app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`)
})