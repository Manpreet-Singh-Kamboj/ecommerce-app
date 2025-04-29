import express from "express";
import { User } from "../models/user.model.ts";
import { Cart } from "../models/cart.model.ts";
import { Otp } from "../models/otp.model.ts";
import { Wishlist } from "../models/wishlist.model.ts";
import bcrypt from "bcryptjs";

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
    const existingOtp = await Otp.findOne({ email });
    if (!existingOtp || existingOtp.otp !== otp) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }
    const existingUser = await User.exists({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
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
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const sendOtpController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const existingUser = await User.exists({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const existingOtp = await Otp.exists({ email });
    if (existingOtp) await Otp.findByIdAndDelete(existingOtp._id);
    await Otp.create({ email });
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
