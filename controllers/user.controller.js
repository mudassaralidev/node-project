import User from '../models/User.model.js';
import asyncHandler from '../middlewares/async.middleware.js';
import ErrorResponse from '../utils/errorResponse.js';
import UserResource from '../resources/user.js';

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json(UserResource.serialize(user));
});

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new ErrorResponse(`User not found with id: ${req.params.id}`, 404)

  res.status(200).json({
    success: true,
    data: UserResource.serialize(user),
  });
});

export const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    email: req.body.email,
    name: req.body.name
  };

  const user = await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new ErrorResponse(`User not found with id: ${req.params.id}`, 404)

  res.status(200).json({
    success: true,
    data: UserResource.serialize(user),
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) throw new ErrorResponse(`User not found with id: ${req.params.id}`, 404)

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
