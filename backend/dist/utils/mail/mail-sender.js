"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = require("../../utils/dotenv");
(0, dotenv_1.loadEnv)();
if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD)
    throw new Error("Email or Email password not found in .env file");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const sendEmail = async ({ email, title, htmlBody }) => {
    if (!process.env.EMAIL)
        throw new Error("Email not found in.env file");
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: title,
        html: htmlBody,
    };
    try {
        transporter.sendMail(mailOptions, (error, _) => {
            if (error) {
                console.error("Error sending email: ", error);
            }
        });
    }
    catch (error) {
        console.error("Error sending email: ", error);
    }
};
exports.sendEmail = sendEmail;
