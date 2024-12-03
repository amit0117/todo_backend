import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModels';
import { Request, Response, NextFunction } from 'express';
import generateToken from '../utils/generateToken';

const registerUser = expressAsyncHandler(
  async (req: Request, res: Response, _: NextFunction) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('User Already Exists');
    }
    const createdUser = await User.create({ name, email, password });
    if (createdUser) {
      res.status(201).json({
        userId: createdUser._id,
        name,
        email,
        token: generateToken({ userId: createdUser._id }),
      });
    } else {
      res.status(401);
      throw new Error('Invalid User Data');
    }
  }
);

const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      userIid: user._id,
      name: user.name,
      email: user.email,
      token: generateToken({ userId: user._id }),
    });
  } else {
    res.status(400);
    throw new Error('Inavild Credentials');
  }
});

export { registerUser, loginUser };
