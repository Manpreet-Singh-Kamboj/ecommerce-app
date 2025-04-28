import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const AddressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required!"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required!"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required!"],
    },
    addressLine1: {
      type: String,
      required: [true, "Address line 1 is required!"],
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "City is required!"],
    },
    state: {
      type: String,
      required: [true, "State is required!"],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required!"],
    },
    lat: {
      type: Number,
      required: [true, "Latitude is required!"],
    },
    lng: {
      type: Number,
      required: [true, "Longitude is required!"],
    },
    label: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

AddressSchema.index({ userId: 1 });

export const Address = models.Address || model("Address", AddressSchema);
