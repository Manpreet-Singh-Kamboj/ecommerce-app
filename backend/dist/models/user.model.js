"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model, models } = mongoose_1.default;
const UserSchema = new Schema({
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
}, { timestamps: true });
exports.User = models.User || model("User", UserSchema);
