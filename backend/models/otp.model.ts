import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const OtpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

export const Otp = models.Otp || model("Otp", OtpSchema);
