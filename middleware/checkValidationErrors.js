import { validationResult } from 'express-validator';
import ApiError from '../errors/ApiError.js';

export default function checkValidationErrors(req, res, next) {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.errors && errors.errors.map((err) => err.msg);
    return next(ApiError.badRequest(errors));
  }
  next();
}
