import express from "express";
import { User } from "../models/user.model.ts";
import { Cart } from "../models/cart.model.ts";
import { Wishlist } from "../models/wishlist.model.ts";
import bcrypt from "bcryptjs";

export const signUpController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    const cart = await Cart.create({ userId: user._id });
    const wishlist = await Wishlist.create({ userId: user._id });
    user.cart = cart._id;
    user.wishlist = wishlist._id;
    await user.save();
    user.password = null;
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
