import express from "express";
import {
  Login,
  Register,
  ResetPassword,
} from "../controllers/authController.js";
import { sendMail } from "../controllers/mailController.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/email", sendMail);
router.post("/reset-password", ResetPassword);

export default router;
