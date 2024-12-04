import expressAsyncHandler from 'express-async-handler';
import Todo from '../models/totoModels';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const createTodo = expressAsyncHandler(
  async (req: Request, res: Response, _: NextFunction) => {
    // @ts-ignore
    const user_id = req.user._id;
    const { title, description, priority, due_date, status, is_deleted } =
      req.body;
    if (!title) {
      res.status(400);
      throw new Error('Title is a required Field');
    }
    const todo = new Todo({
      user_id,
      title,
      description,
      priority,
      due_date,
      is_deleted,
      status,
    });
    const createdTodo = await todo.save();
    res.status(201).json({ createdTodo });
  }
);

const updateTodo = expressAsyncHandler(
  async (req: Request, res: Response, _: NextFunction) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404);
      throw new Error('Todo Not Found');
    }
    const updates = req.body;
    Object.assign(todo, updates);
    const updatedTodo = await todo.save();
    res.status(200).json({ updatedTodo });
  }
);

const getTodoDetails = expressAsyncHandler(
  async (req: Request, res: Response, _: NextFunction) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404);
      throw new Error('Todo Not Found!');
    }
    res.status(200).json({ todo });
  }
);

const softDeleteTodo = expressAsyncHandler(
  async (req: Request, res: Response, _: NextFunction) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404);
      throw new Error('Todo Not Found');
    }
    todo.is_deleted = true;
    await todo.save();
    res.status(200).json({ messaage: 'Todo Soft Deleted Successfully' });
  }
);

const getAllTodos = expressAsyncHandler(
  async (req: Request, res: Response, _: NextFunction) => {
    // @ts-ignore
    const user_id = req.user?._id;
    const deleted_status = req.query?.deleted_status as string | undefined;
    const todoSearch = req.query?.todoSearch as string | undefined;

    if (!user_id) {
      res.status(400);
      throw new Error('Invalid User. Please Login and try again!');
    }
    const userId = new mongoose.Types.ObjectId(user_id);

    const query: any = { user_id: userId };

    if (deleted_status != undefined && deleted_status.trim() !== '') {
      query.is_deleted = deleted_status === 'true';
    }

    // If todoSearch is provided, add search conditions
    if (todoSearch && todoSearch.trim() !== '') {
      const searchRegex = new RegExp(todoSearch, 'i'); // Case-insensitive search
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { status: searchRegex },
        { priority: searchRegex },
      ];
    }

    const todos = await Todo.find(query);

    res.status(200).json({
      todos,
    });
  }
);

export { createTodo, getTodoDetails, updateTodo, softDeleteTodo, getAllTodos };
