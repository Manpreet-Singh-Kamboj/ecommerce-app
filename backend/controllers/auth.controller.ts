import express from "express";
import { User } from "../models/user.model";
import { Cart } from "../models/cart.model";
import { Otp } from "../models/otp.model";
import { Wishlist } from "../models/wishlist.model";
import bcrypt from "bcryptjs";
import { generateJwtToken, verifyJwtToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const signUpController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email, password, otp } = req.body;
    if (!name || !email || !password || !otp) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const existingUser = await User.exists({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const existingOtp = await Otp.findOne({ email });
    if (!existingOtp) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }
    const isOtpMatched = await bcrypt.compare(otp, existingOtp.otp);
    if (!isOtpMatched) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: true,
    });
    const cart = await Cart.create({ userId: user._id });
    const wishlist = await Wishlist.create({ userId: user._id });
    user.cart = cart._id;
    user.wishlist = wishlist._id;
    await user.save();
    await Otp.findByIdAndDelete(existingOtp._id);
    user.password = null;
    res.status(201).json({
      success: true,
      message: "Sign up successful. Please login to continue.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};

export const sendOtpController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, type } = req.body;
    if (!email || !type) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }
    const existingUser = await User.exists({ email });
    if (type === "sign_up" && existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }
    const existingOtp = await Otp.exists({ email });
    if (existingOtp) await Otp.findByIdAndDelete(existingOtp._id);
    await Otp.create({ email, reason: type });
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};

export const signInController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password!);
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
    const accessToken = generateJwtToken({
      jwtPayload: accessTokenPayload,
      jwtExpiry: "30m",
      jwtSecret: process.env.ACCESS_TOKEN_SECRET,
    });
    const refreshTokenPayload = {
      userId: user._id,
    };
    const refreshToken = generateJwtToken({
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
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};

export const verifyResetPasswordOtpController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }
    const existingOtp = await Otp.findOne({ email });
    if (!existingOtp) {
      res.status(400).json({ success: false, message: "Invalid OTP" });
      return;
    }
    const isOtpMatched = await bcrypt.compare(otp, existingOtp.otp);
    if (!isOtpMatched) {
      res.status(400).json({ success: false, message: "Invalid OTP" });
      return;
    }
    await Otp.findByIdAndDelete(existingOtp._id);
    const resetPasswordToken = generateJwtToken({
      jwtPayload: { email },
      jwtExpiry: "5m",
      jwtSecret: process.env.RESET_PASSWORD_TOKEN_SECRET!,
    });
    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token: resetPasswordToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};

export const forgotPasswordController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, newPassword, token } = req.body;
    if (!email || !newPassword || !token) {
      res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
      return;
    }
    const isVerified = verifyJwtToken({
      token,
      jwtSecret: process.env.RESET_PASSWORD_TOKEN_SECRET!,
    }) as JwtPayload;
    if (!isVerified || isVerified.email !== email) {
      res.status(400).json({
        success: false,
        message: "Verification Failed. Please try again.",
      });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User does not exist" });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message:
        "Password changed successfully. You can now use your new password to log in.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};

export const refreshTokenController = async (
  req: express.Request,
  res: express.Response
) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ success: false, message: "No token provided" });
    return;
  }
  try {
    if (!process.env.REFRESH_TOKEN_SECRET)
      throw new Error("REFRESH_TOKEN_SECRET is not defined");
    const decoded = verifyJwtToken({
      token: refreshToken,
      jwtSecret: process.env.REFRESH_TOKEN_SECRET,
    }) as JwtPayload;
    if (!decoded.userId) {
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    const accessTokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const newAccessToken = generateJwtToken({
      jwtPayload: accessTokenPayload,
      jwtExpiry: "30m",
      jwtSecret: process.env.ACCESS_TOKEN_SECRET!,
    });
    const refreshTokenPayload = {
      userId: user._id,
    };
    const newRefreshToken = generateJwtToken({
      jwtPayload: refreshTokenPayload,
      jwtExpiry: "7d",
      jwtSecret: process.env.REFRESH_TOKEN_SECRET!,
    });
    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error,
    });
  }
};

export const isAuthenticatedController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      res.status(401).json({ success: false, message: "No token provided" });
      return;
    }
    if (!process.env.ACCESS_TOKEN_SECRET)
      throw new Error("ACCESS_TOKEN_SECRET is not defined");
    const decoded = verifyJwtToken({
      token: accessToken,
      jwtSecret: process.env.ACCESS_TOKEN_SECRET,
    }) as JwtPayload;
    if (!decoded.userId) {
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }
    res.status(200).json({ success: true, message: "Authenticated" });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error,
    });
  }
};
