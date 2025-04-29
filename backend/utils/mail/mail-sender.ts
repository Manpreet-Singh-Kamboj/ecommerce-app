import nodemailer from "nodemailer";
import { loadEnv } from "../../utils/dotenv.ts";
import { otpVerificationMail } from "./templates/otp-verification.ts";
loadEnv();

if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD)
  throw new Error("Email or Email password not found in .env file");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (email: string, otp: string) => {
  if (!process.env.EMAIL) throw new Error("Email not found in.env file");
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify your OTP - Khareedo",
    html: otpVerificationMail(otp),
  };
  try {
    transporter.sendMail(mailOptions, (error, _) => {
      if (error) {
        throw new Error("Error sending email: ", error);
      }
    });
  } catch (error) {
    throw new Error("Error sending email: ", error);
  }
};
