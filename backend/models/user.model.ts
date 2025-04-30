import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Email already exists!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be at least 8 characters!"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    wishlist: {
      type: Schema.Types.ObjectId,
      ref: "Wishlist",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
