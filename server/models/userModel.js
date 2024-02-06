import mongoose, { Schema, model } from "mongoose";

const userModel = model(
  "Users",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      cPassword: {
        type: String,
      },
    },
    { timestamps: true }
  )
);

export default userModel;
