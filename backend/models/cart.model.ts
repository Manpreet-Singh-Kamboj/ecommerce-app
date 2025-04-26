import { Schema, model, models } from "mongoose";

const CartSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

CartSchema.index({ userId: 1 });
export const Cart = models.Cart || model("Cart", CartSchema);
