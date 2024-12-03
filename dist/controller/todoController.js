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
exports.getAllTodos = exports.softDeleteTodo = exports.updateTodo = exports.getTodoDetails = exports.createTodo = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const totoModels_1 = __importDefault(require("../models/totoModels"));
const mongoose_1 = __importDefault(require("mongoose"));
const createTodo = (0, express_async_handler_1.default)((req, res, _) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user_id = req.user._id;
    const { title, description, priority, due_date } = req.body;
    if (!title) {
        res.status(400);
        throw new Error('Title is a required Field');
    }
    const todo = new totoModels_1.default({
        user_id,
        title,
        description,
        priority,
        due_date,
    });
    const createdTodo = yield todo.save();
    res.status(201).json({ createdTodo });
}));
exports.createTodo = createTodo;
const updateTodo = (0, express_async_handler_1.default)((req, res, _) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield totoModels_1.default.findById(id);
    if (!todo) {
        res.status(404);
        throw new Error('Todo Not Found');
    }
    const updates = req.body;
    Object.assign(todo, updates);
    const updatedTodo = yield todo.save();
    res.status(200).json({ updatedTodo });
}));
exports.updateTodo = updateTodo;
const getTodoDetails = (0, express_async_handler_1.default)((req, res, _) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield totoModels_1.default.findById(id);
    if (!todo) {
        res.status(404);
        throw new Error('Todo Not Found!');
    }
    res.status(200).json({ todo });
}));
exports.getTodoDetails = getTodoDetails;
const softDeleteTodo = (0, express_async_handler_1.default)((req, res, _) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield totoModels_1.default.findById(id);
    if (!todo) {
        res.status(404);
        throw new Error('Todo Not Found');
    }
    todo.is_deleted = true;
    yield todo.save();
    res.status(200).json({ messaage: 'Todo Soft Deleted Successfully' });
}));
exports.softDeleteTodo = softDeleteTodo;
const getAllTodos = (0, express_async_handler_1.default)((req, res, _) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // @ts-ignore
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const deleted_status = (_b = req.query) === null || _b === void 0 ? void 0 : _b.deleted_status;
    const is_deleted = deleted_status === 'true';
    if (!user_id) {
        res.status(400);
        throw new Error('Invalid User. Please Login and try again!');
    }
    const userId = new mongoose_1.default.Types.ObjectId(user_id);
    const todos = yield totoModels_1.default.find({ user_id: userId, is_deleted })
        .populate('user_id', 'name email') // Populating user details (Only Email id and name)
        .exec();
    res.status(200).json({
        todos,
    });
}));
exports.getAllTodos = getAllTodos;
//# sourceMappingURL=todoController.js.map