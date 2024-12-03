import User from '../models/userModels';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const authorize = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET ?? '');

        if (
          typeof decodedToken === 'object' &&
          decodedToken !== null &&
          'userId' in decodedToken
        ) {
          const { userId } = decodedToken;

          const user = await User.findById(userId).select('-password');

          // @ts-ignore
          req.user = user;
          next();
        } else {
          res.status(401);
          throw new Error('Invalid token');
        }
      } catch (error: any) {
        res.status(401);
        next(error);
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, No Token Provided');
    }
  }
);

export { authorize };
