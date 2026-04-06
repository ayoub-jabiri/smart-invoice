import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

export const dbConnect = async () => {
    try {
        await mongoose.connect(DB_URL);

        console.log("Database connected!");
    } catch (error) {
        console.log(error);
    }
};
