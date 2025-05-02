"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordController = exports.verifyResetPasswordOtpController = exports.signInController = exports.sendOtpController = exports.signUpController = void 0;
const user_model_1 = require("../models/user.model");
const cart_model_1 = require("../models/cart.model");
const otp_model_1 = require("../models/otp.model");
const wishlist_model_1 = require("../models/wishlist.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const signUpController = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;
        if (!name || !email || !password || !otp) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const existingUser = await user_model_1.User.exists({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const existingOtp = await otp_model_1.Otp.findOne({ email });
        if (!existingOtp) {
            res.status(400).json({ message: "Invalid OTP" });
            return;
        }
        const isOtpMatched = await bcryptjs_1.default.compare(otp, existingOtp.otp);
        if (!isOtpMatched) {
            res.status(400).json({ message: "Invalid OTP" });
            return;
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const user = await user_model_1.User.create({
            name,
            email,
            password: hashedPassword,
            isEmailVerified: true,
        });
        const cart = await cart_model_1.Cart.create({ userId: user._id });
        const wishlist = await wishlist_model_1.Wishlist.create({ userId: user._id });
        user.cart = cart._id;
        user.wishlist = wishlist._id;
        await user.save();
        await otp_model_1.Otp.findByIdAndDelete(existingOtp._id);
        user.password = null;
        res.status(201).json({
            success: true,
            message: "Sign up successful. Please login to continue.",
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Something went wrong", error });
    }
};
exports.signUpController = signUpController;
const sendOtpController = async (req, res) => {
    try {
        const { email, type } = req.body;
        if (!email || !type) {
            res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
            return;
        }
        const existingUser = await user_model_1.User.exists({ email });
        if (type === "sign_up" && existingUser) {
            res.status(400).json({ success: false, message: "User already exists" });
            return;
        }
        const existingOtp = await otp_model_1.Otp.exists({ email });
        if (existingOtp)
            await otp_model_1.Otp.findByIdAndDelete(existingOtp._id);
        await otp_model_1.Otp.create({ email, reason: type });
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Something went wrong", error });
    }
};
exports.sendOtpController = sendOtpController;
const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User does not exist" });
            return;
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }
        user.password = null;
        if (!process.env.ACCESS_TOKEN_SECRET)
            throw new Error("ACCESS_TOKEN_SECRET is not defined");
        if (!process.env.REFRESH_TOKEN_SECRET)
            throw new Error("REFRESH_TOKEN_SECRET is not defined");
        const accessTokenPayload = {
            userId: user._id,
            email: user.email,
            role: user.role,
        };
        const accessToken = (0, jwt_1.generateJwtToken)({
            jwtPayload: accessTokenPayload,
            jwtExpiry: "30m",
            jwtSecret: process.env.ACCESS_TOKEN_SECRET,
        });
        const refreshTokenPayload = {
            userId: user._id,
        };
        const refreshToken = (0, jwt_1.generateJwtToken)({
            jwtPayload: refreshTokenPayload,
            jwtExpiry: "7d",
            jwtSecret: process.env.REFRESH_TOKEN_SECRET,
        });
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Something went wrong", error });
    }
};
exports.signInController = signInController;
const verifyResetPasswordOtpController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
            return;
        }
        const existingOtp = await otp_model_1.Otp.findOne({ email });
        if (!existingOtp) {
            res.status(400).json({ success: false, message: "Invalid OTP" });
            return;
        }
        const isOtpMatched = await bcryptjs_1.default.compare(otp, existingOtp.otp);
        if (!isOtpMatched) {
            res.status(400).json({ success: false, message: "Invalid OTP" });
            return;
        }
        await otp_model_1.Otp.findByIdAndDelete(existingOtp._id);
        const resetPasswordToken = (0, jwt_1.generateJwtToken)({
            jwtPayload: { email },
            jwtExpiry: "5m",
            jwtSecret: process.env.RESET_PASSWORD_TOKEN_SECRET,
        });
        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            token: resetPasswordToken,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Something went wrong", error });
    }
};
exports.verifyResetPasswordOtpController = verifyResetPasswordOtpController;
const forgotPasswordController = async (req, res) => {
    try {
        const { email, newPassword, token } = req.body;
        if (!email || !newPassword || !token) {
            res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
            return;
        }
        const isVerified = (0, jwt_1.verifyJwtToken)({
            token,
            jwtSecret: process.env.RESET_PASSWORD_TOKEN_SECRET,
        });
        if (!isVerified || isVerified.email !== email) {
            res.status(400).json({
                success: false,
                message: "Verification Failed. Please try again.",
            });
            return;
        }
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: "User does not exist" });
            return;
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password changed successfully. You can now use your new password to log in.",
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Something went wrong", error });
    }
};
exports.forgotPasswordController = forgotPasswordController;
