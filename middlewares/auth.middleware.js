import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middlewares/async.middleware.js';
import User from '../models/User.model.js';

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) return next(new ErrorResponse('Please login yourself to have the access', 401));

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Please login yourself to have the access', 401));
  }
});

export default auth