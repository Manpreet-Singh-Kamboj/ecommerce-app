import { Router } from "express";
import {
  signUpController,
  sendOtpController,
} from "../controllers/auth.controller.ts";

const router = Router();

router.post("/sign-up", signUpController);
router.post("/send-otp", sendOtpController);

export default router;
