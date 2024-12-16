import mongoose from 'mongoose'

export const connectDataBase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/green-basket');
        console.log("DB Connected")
    } catch (error) {
        console.error("Database connection failed", error);
    }
};