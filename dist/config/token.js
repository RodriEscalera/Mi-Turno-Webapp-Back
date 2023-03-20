"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateValidationToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = __importDefault(require("./envs"));
const generateToken = (payload) => {
    const token = jsonwebtoken_1.default.sign({ user: payload }, envs_1.default.jwtSecret);
    return token;
};
exports.generateToken = generateToken;
const generateValidationToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, envs_1.default.jwtSecret);
    return token;
};
exports.generateValidationToken = generateValidationToken;
const validateToken = (token) => {
    return jsonwebtoken_1.default.verify(token, envs_1.default.jwtSecret);
};
exports.validateToken = validateToken;
