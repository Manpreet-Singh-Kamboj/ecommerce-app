"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("./utils/dotenv");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const database_1 = __importDefault(require("./config/database"));
(0, dotenv_1.loadEnv)();
const PORT = process.env.PORT || 5000;
(0, database_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Server is running");
});
exports.default = app;
