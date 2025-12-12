import express from "express";
import mongoose from "mongoose";
import { User } from "./models/user.js";
import  cors  from 'cors';

const app = express();
app.use(express.json()); // VERY IMPORTANT
app.use(cors());
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://mongodb:27017/testdb");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
    console.log("DB connection attempt finished");
};


connectDB();

// GET all users
app.get("/", async (req, res) => {
    const data = await User.find();
    res.json(data);
    // res.send(data);
});

// Add a user
app.post("/add-user", async (req, res) => {
    const username = "Dhanraj";

    const newUser = new User({ username });
    await newUser.save();

    res.json({ message: "User added", user: newUser });

});

app.listen(3000,'0.0.0.0', () => {
    console.log("Server is listening on port 3000");
});
