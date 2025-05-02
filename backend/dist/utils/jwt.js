"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtToken = ({ jwtPayload, jwtExpiry, jwtSecret, }) => {
    return jsonwebtoken_1.default.sign(jwtPayload, jwtSecret, {
        expiresIn: jwtExpiry,
    });
};
exports.generateJwtToken = generateJwtToken;
const verifyJwtToken = ({ token, jwtSecret }) => {
    return jsonwebtoken_1.default.verify(token, jwtSecret);
};
exports.verifyJwtToken = verifyJwtToken;
