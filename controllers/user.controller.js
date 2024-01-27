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

  sendTokenResponse(user, 201, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new ErrorResponse('Please Provide an email or password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new ErrorResponse('Invalid Creds', 401));

  const isMatch = await user.matchPassword(password);

  if (!isMatch) return next(new ErrorResponse('Invalid Creds', 401));

  sendTokenResponse(user, 200, res);
});

export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(204).json({
    success: true,
    message: "Logged out successfully"
  });
});

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) throw new ErrorResponse(`User not found with id: ${req.params.id}`, 404)

  res.status(200).json({
    success: true,
    data: UserResource.serialize(user)
  });
});

export const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    email: req.body.email,
    name: req.body.name
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new ErrorResponse(`User not found with id: ${req.params.id}`, 404)

  res.status(200).json({
    success: true,
    data: UserResource.serialize(user)
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) throw new ErrorResponse(`User not found with id: ${req.params.id}`, 404)

  res.status(204).json({
    success: true,
    message: "User deleted successfully"
  });
});

const sendTokenResponse = function (user, statusCode, res) {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token
  });
};
