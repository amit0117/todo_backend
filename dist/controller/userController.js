"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModels_1 = __importDefault(require("../models/userModels"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registerUser = (0, express_async_handler_1.default)((req, res, _) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const existingUser = yield userModels_1.default.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error('User Already Exists');
    }
    const createdUser = yield userModels_1.default.create({ name, email, password });
    if (createdUser) {
        res.status(201).json({
            userId: createdUser._id,
            name,
            email,
            token: (0, generateToken_1.default)({ userId: createdUser._id }),
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid User Data');
    }
}));
exports.registerUser = registerUser;
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModels_1.default.findOne({ email });
    if (user && (yield user.matchPassword(password))) {
        res.status(200).json({
            userIid: user._id,
            name: user.name,
            email: user.email,
            token: (0, generateToken_1.default)({ userId: user._id }),
        });
    }
    else {
        res.status(400);
        throw new Error('Inavild Credentials');
    }
}));
exports.loginUser = loginUser;
//# sourceMappingURL=userController.js.map