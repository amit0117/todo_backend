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
exports.authorize = void 0;
const userModels_1 = __importDefault(require("../models/userModels"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authorize = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if ((_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jsonwebtoken_1.default.verify(token, (_c = process.env.JWT_SECRET) !== null && _c !== void 0 ? _c : '');
            if (typeof decodedToken === 'object' &&
                decodedToken !== null &&
                'userId' in decodedToken) {
                const { userId } = decodedToken;
                const user = yield userModels_1.default.findById(userId).select('-password');
                // @ts-ignore
                req.user = user;
                next();
            }
            else {
                res.status(401);
                throw new Error('Invalid token');
            }
        }
        catch (error) {
            res.status(401);
            next(error);
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorized, No Token Provided');
    }
}));
exports.authorize = authorize;
//# sourceMappingURL=authmiddleware.js.map