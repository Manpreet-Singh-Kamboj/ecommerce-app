import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const WishlistSchema = new Schema({
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
    },
  ],
});

WishlistSchema.index({ userId: 1 });

export const Wishlist = models.Wishlist || model("Wishlist", WishlistSchema);
