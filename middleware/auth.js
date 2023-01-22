import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import ApiError from '../errors/ApiError.js';

export default async function checkAuth(req, res, next) {
  try {
    let token =
      req.headers.authorization &&
      req.headers.authorization.split('Bearer ')[1];

    if (!token) return next(ApiError.unauthorized('Not authorized.'));

    let { id } = jwt.decode(token);
    let user = await User.findById(id);
    if (!user) {
      return next(ApiError.notFound('User not found.'));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(ApiError.unauthorized('Invalid token.'));
  }
}
