"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("@/config"));
const response_error_1 = require("@/error/response.error");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new response_error_1.ResponseError(401, 'Unauthorized: Token tidak tersedia'));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        req.user = decoded; // Tempelkan data user ke request
        next(); // Lanjutkan ke middleware atau controller berikutnya
    }
    catch (error) {
        return next(new response_error_1.ResponseError(401, 'Unauthorized: Token tidak valid atau kedaluwarsa'));
    }
};
exports.authMiddleware = authMiddleware;
