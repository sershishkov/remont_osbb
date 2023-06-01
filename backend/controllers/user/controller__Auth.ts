import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__User from '../../models/user/Model__User';
import generateToken from '../../utils/generateToken';

//@desc   register __User
//@route  POST /api/auth/register
//@acces  Public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //Check if user exists
  const user__Exists = await Model__User.findOne({ email });
  if (user__Exists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //Create user
  const user = await Model__User.create({
    name,
    email,
    password,
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid user data');
  } else {
    generateToken(res, user._id.toString());

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }
});

//@desc   login
//@route  POST /api/auth/login
//@acces  Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please add email or password');
  }

  const user = await Model__User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id.toString());
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
