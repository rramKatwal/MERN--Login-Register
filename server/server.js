import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "../server/routes/authRoute.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/", authRoutes);

const port = process.env.PORT || 8080;

const database = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database connected");
  } catch (error) {
    throw error;
  }
};

app.listen(port, () => {
  database();
  console.log(`Server Running at Port: ${port}`);
});
