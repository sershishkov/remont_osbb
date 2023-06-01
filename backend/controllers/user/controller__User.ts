import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__User from '../../models/user/Model__User';

import { I_GetUserAuthInfoToRequest } from '../../interfaces/UserInterface';

//@desc   Log user out / clear cookie
//@route  GET /api/user/logout
//@access Private
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
export const getUserProfile = asyncHandler(
  async (req: I_GetUserAuthInfoToRequest, res: Response) => {
    const user = await Model__User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
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

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      await user.save();

      res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });

      res.status(200).json({
        message: 'You updated your profile and Logged out successfully',
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
);
