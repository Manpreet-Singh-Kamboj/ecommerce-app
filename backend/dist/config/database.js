"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("../utils/dotenv");
(0, dotenv_1.loadEnv)();
const connectToDatabase = () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable inside .env");
    }
    mongoose_1.default
        .connect(MONGODB_URI)
        .then(() => console.log("Connected to database "))
        .catch((err) => console.log(err));
};
exports.default = connectToDatabase;
