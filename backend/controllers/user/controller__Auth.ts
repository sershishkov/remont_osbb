import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__User from '../../models/user/Model__User';

import {
  I_GetUserAuthInfoToRequest,
  I_UserAuthModel,
} from '../../interfaces/UserInterface';

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
    sendTokenResponse(user, 200, res);
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
    sendTokenResponse(user, 200, res);
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});
//@desc   Log user out / clear cookie
//@route  GET /api/auth/logout
//@access Private
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    token: null,
  });
});

//@desc   Get current logged user
//@route  GET /api/auth/me
//@acces  Private
export const getMe = asyncHandler(
  async (req: I_GetUserAuthInfoToRequest, res: Response) => {
    res.status(200).json(req.user);
  }
);

//@desc   Update user details
//@route  PUT /api/auth/updatedetails
//@acces  Private
export const updateDetails = asyncHandler(
  async (req: I_GetUserAuthInfoToRequest, res: Response) => {
    const { name, email } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__User = {
      name,
      email,
    };

    const updated__User = await Model__User.findByIdAndUpdate(
      req.user._id,
      new__User,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated__User) {
      res.status(400);
      throw new Error('Invalid user data');
    } else {
      res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        token: null,
      });
    }
  }
);

//@desc   Update password
//@route  PUT /api/auth/updatepassword
//@acces  Private
export const updatePassword = asyncHandler(
  async (req: I_GetUserAuthInfoToRequest, res: Response) => {
    const user = await Model__User.findById(req.user._id).select('+password');

    if (!user) {
      res.status(400);
      throw new Error('This user does not exist');
    }

    const { currentPassword, newPassword } = req.body;

    // console.log(currentPassword, newPassword);

    // console.log(user.matchPassword(currentPassword));

    if (!(await user.matchPassword(currentPassword))) {
      res.status(401);
      throw new Error('Password is incorrect');
    } else {
      user.password = newPassword;
      user.save();
      res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        token: null,
      });
    }
  }
);

//Get token from model , create cookie and send response
const sendTokenResponse = (
  user: I_UserAuthModel,
  statusCode: number,
  res: Response
) => {
  //Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({ success: true, token });
};
