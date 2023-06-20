// utils/database.js

import mongoose from "mongoose";

const connectDB = async() => {
    try {

        await mongoose.connect("mongodb+srv://k-satou:arkline133@cluster0.xid6fj1.mongodb.net/appDataBase?retryWrites=true&w=majority");
        console.log("Success: Connected to MongoDB");

    } catch (err) {

        console.log("Failure: Unconnected to MongoDB");
        throw new Error();

    }
};

export default connectDB;