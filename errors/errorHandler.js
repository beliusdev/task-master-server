import ApiError from './ApiError.js';

export default function apiErrorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return err.message instanceof Array
      ? res.status(400).send(err.message)
      : res.status(err.statusCode).json(err.message);
  }

  if (err && err.code == 11000) {
    return res.status(400).json(err.messages);
  }
  
  console.log(err.message);
  res.status(500).send('Something went wrong.');
}
