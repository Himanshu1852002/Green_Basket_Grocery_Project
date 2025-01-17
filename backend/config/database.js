import mongoose from 'mongoose'
export const connectDataBase = async () => {
    try {
        await mongoose.connect("mongodb+srv://himanshu2023:himanshu123@cluster0.bpjaf.mongodb.net/green-basket");
        console.log("DB Connected")
    } catch (error) {
        console.error("Database connection failed", error);
    }
};




