"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authmiddleware_1 = require("../middleware/authmiddleware");
const todoController_1 = require("../controller/todoController");
const router = express_1.default.Router();
router.use(authmiddleware_1.authorize);
router.post('/', todoController_1.createTodo);
router.get('/all', todoController_1.getAllTodos);
router.get('/:id', todoController_1.getTodoDetails);
router.put('/:id', todoController_1.updateTodo);
router.delete('/:id', todoController_1.softDeleteTodo);
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map