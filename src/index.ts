import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db';
import { notFound, errorHandler } from './middleware/errormiddleware';
import userRoutes from '../src/routes/userRoutes';
import todoRoutes from '../src/routes/todoRoutes';
import { Request, Response } from 'express';
import cors from 'cors';
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running.' });
});

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

app.use(notFound);
app.use(errorHandler);
const port = process.env.port || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
