import mongoose from "mongoose";

export async function dbConfigConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on("connected", () => console.log("Connected to MongoDB"));
        connection.on("disconnected", () => console.log("Disconnected from MongoDB"));
        connection.on("error", (err)=>{
            console.error("Error connecting to MongoDB:", err);
            process.exit(); 
        })
        // console.log("Free Log: Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}