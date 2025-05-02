"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model, models } = mongoose_1.default;
const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required!"],
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "Product ID is required!"],
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity can’t be less than 1!"],
                default: 1,
            },
            size: {
                type: String,
                required: [true, "Size is required!"],
            },
        },
    ],
}, {
    timestamps: true,
});
CartSchema.index({ userId: 1 });
exports.Cart = models.Cart || model("Cart", CartSchema);
