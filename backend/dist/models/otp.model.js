"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mail_sender_1 = require("../utils/mail/mail-sender");
const otp_verification_1 = require("../utils/mail/templates/otp-verification");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const reset_password_1 = require("../utils/mail/templates/reset-password");
const { Schema, model, models } = mongoose_1.default;
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
    if (!this.isNew)
        return;
    const otp = Math.floor(1000 + Math.random() * 9000);
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedOtp = await bcryptjs_1.default.hash(otp.toString(), salt);
    this.otp = hashedOtp;
    (0, mail_sender_1.sendEmail)({
        email: this.email,
        title: this.reason === "sign_up"
            ? "Verify your email - Khareedo"
            : "Reset your password - Khareedo",
        htmlBody: this.reason === "sign_up"
            ? (0, otp_verification_1.otpVerificationMail)(otp.toString())
            : (0, reset_password_1.resetPasswordVerificationEmail)(otp.toString()),
    });
    next();
});
exports.Otp = models.Otp || model("Otp", OtpSchema);
