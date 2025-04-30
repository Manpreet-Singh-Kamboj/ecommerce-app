import { Router } from "express";
import {
  signUpController,
  sendOtpController,
  signInController
} from "../controllers/auth.controller.ts";

const router = Router();

router.post("/sign-up", signUpController);
router.post("/send-otp", sendOtpController);
router.post("/sign-in", signInController);

export default router;
