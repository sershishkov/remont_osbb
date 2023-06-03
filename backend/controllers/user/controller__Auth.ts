import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__User from '../../models/user/Model__User';
import generateToken from '../../utils/generateToken';
import { I_GetUserAuthInfoToRequest } from '../../interfaces/UserInterface';

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
      message: 'Registred successfully',
      userInfo: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
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
      message: 'Logged IN successfully',
      userInfo: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

//@desc   Log user out / clear cookie
//@route  GET /api/auth/logout
//@access Private
export const logout = asyncHandler(
  async (req: I_GetUserAuthInfoToRequest, res: Response) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res
      .status(200)
      .json({ message: 'Logged out successfully', userInfo: null });
  }
);

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = asyncHandler(
  async (req: I_GetUserAuthInfoToRequest, res: Response) => {
    const user = await Model__User.findById(req.user._id);

    if (user) {
      res.json({
        message: 'User Exists',
        userInfo: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
);

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
export const updateUserProfile = asyncHandler(
  async (req: I_GetUserAuthInfoToRequest, res: Response) => {
    const user = await Model__User.findById(req.user._id);

    const { name, email, password } = req.body;

    if (user) {
      user.name = name ?? user.name;
      user.email = email ?? user.email;

      if (password) {
        user.password = password;
      }

      await user.save();

      res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });

      res.status(200).json({
        message: 'You updated your profile and Logged out successfully',
        userInfo: null,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
);
