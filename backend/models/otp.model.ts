import mongoose from "mongoose";
import { sendEmail } from "../utils/mail/mail-sender.ts";
import { otpVerificationMail } from "../utils/mail/templates/otp-verification.ts";
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
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

OtpSchema.pre("save", async function (next) {
  if (!this.isNew) return;
  const otp = Math.floor(1000 + Math.random() * 9000);
  this.otp = otp.toString();
  sendEmail({
    email: this.email,
    title: "Verify your email - Khareedo",
    htmlBody: otpVerificationMail(otp.toString()),
  });
  next();
});

export const Otp = models.Otp || model("Otp", OtpSchema);
