import { Router } from "express";
import {
  signUpController,
  sendOtpController,
  signInController,
  forgotPasswordController,
  verifyResetPasswordOtpController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/sign-up", signUpController);
router.post("/send-otp", sendOtpController);
router.post("/sign-in", signInController);
router.post("/verify-reset-password-otp", verifyResetPasswordOtpController);
router.post("/forgot-password", forgotPasswordController);

export default router;
