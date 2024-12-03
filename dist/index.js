"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const errormiddleware_1 = require("./middleware/errormiddleware");
const userRoutes_1 = __importDefault(require("../src/routes/userRoutes"));
const todoRoutes_1 = __importDefault(require("../src/routes/todoRoutes"));
const cors_1 = __importDefault(require("cors"));
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running.' });
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/todos', todoRoutes_1.default);
app.use(errormiddleware_1.notFound);
app.use(errormiddleware_1.errorHandler);
const port = process.env.port || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
//# sourceMappingURL=index.js.map