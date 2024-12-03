import express from 'express';
import { authorize } from '../middleware/authmiddleware';
import {
  createTodo,
  updateTodo,
  getTodoDetails,
  softDeleteTodo,
  getAllTodos,
} from '../controller/todoController';

const router = express.Router();
router.use(authorize);
router.post('/', createTodo);
router.get('/all', getAllTodos);
router.get('/:id', getTodoDetails);
router.put('/:id', updateTodo);
router.delete('/:id', softDeleteTodo);

export default router;
