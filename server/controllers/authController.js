import { comparePassword, hashPassword } from "../functions/authFunction.js";
import OTP from "../models/otpModel.js";
import axios from "axios";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password, cPassword, recaptchaValue } = req.body;

    if (!name || !email || !password || !cPassword) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== cPassword) {
      return res.status(200).json({
        success: false,
        message: "Your password did not match. Please enter correctly",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "Email already registered. Please login to continue",
      });
    }

    const hashedPassword = await hashPassword(password);
    const site = "6Lf7akcpAAAAAHmhtODI016FcTYvHAg_wqmECeTF";

    // Make sure to await the Recaptcha verification and check the result
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${site}&response=${recaptchaValue}`
    );

    if (!recaptchaResponse.data.success) {
      return res.status(200).json({
        success: false,
        message: "Recaptcha verification failed. Please try again.",
      });
    }

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please login to continue.",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Problem while registration",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Email not found. Please register to continue",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      message: "User login successful",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Problem while login",
      error: error.message,
    });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { email, otp, password, cPassword } = req.body;

    if (!email || !otp || !password || !cPassword) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    const otpData = await OTP.findOne({ OTP: otp });

    if (!otpData) {
      return res.status(200).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const currentTime = new Date().getTime();
    const diff = otpData.expiresIn - currentTime;

    if (diff < 0) {
      return res.status(200).json({
        success: false,
        message: "Token Expired",
      });
    }

    if (password !== cPassword) {
      return res.status(200).json({
        success: false,
        message: "Passwords do not match. Please enter them correctly",
      });
    }

    const hashedPassword = await hashPassword(password);
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
