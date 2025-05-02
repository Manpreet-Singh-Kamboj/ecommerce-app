import mongoose from "mongoose";
import { sendEmail } from "../utils/mail/mail-sender";
import { otpVerificationMail } from "../utils/mail/templates/otp-verification";
import bcrypt from "bcryptjs";
import { resetPasswordVerificationEmail } from "../utils/mail/templates/reset-password";
const { Schema, model, models } = mongoose;

const OtpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
  },
  reason: {
    type: String,
    enum: ["sign_up", "forgot_password"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

OtpSchema.pre("save", async function (next) {
  if (!this.isNew) return;
  const otp = Math.floor(1000 + Math.random() * 9000);
  const salt = bcrypt.genSaltSync(10);
  const hashedOtp = await bcrypt.hash(otp.toString(), salt);
  this.otp = hashedOtp;
  sendEmail({
    email: this.email,
    title:
      this.reason === "sign_up"
        ? "Verify your email - Khareedo"
        : "Reset your password - Khareedo",
    htmlBody:
      this.reason === "sign_up"
        ? otpVerificationMail(otp.toString())
        : resetPasswordVerificationEmail(otp.toString()),
  });
  next();
});

export const Otp = models.Otp || model("Otp", OtpSchema);
