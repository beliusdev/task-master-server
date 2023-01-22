import User from '../models/User.js';
import Todo from '../models/Todo.js';
import ApiError from '../errors/ApiError.js';

export const register = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const errors = [];

    const checkUsername = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });

    if (checkUsername) errors.push('Username already exists.');
    if (checkEmail) errors.push('Email is already in use.');
    if (errors.length) return next(ApiError.badRequest(errors));

    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      token: user.getToken(),
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return next(ApiError.notFound('User not found.'));

    let isPasswordMatch = await user.checkPassword(password);
    if (!isPasswordMatch)
      return next(ApiError.forbidden('Wrong email or password.'));

    res.status(200).json({
      token: user.getToken(),
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    ...user._doc,
    password: null,
  });
};

// export const changePassword = async (req, res, next) => {
//   try {
//     const user = req.user;

//     let { password, newPassword } = req.body;

//     let isPasswordMatch = await user.checkPassword(password);
//     if (!isPasswordMatch) return next(ApiError.forbidden('Wrong password.'));

//     user.password = newPassword;
//     await user.save();

//     res.status(200);
//   } catch (error) {
//     next(error);
//   }
// }

// export const editUser = async (req, res, next) => {
//   try {
//     const user = req.user;
//     const { username, email } = req.body;

//     user.username = username;
//     user.email = email;

//     await user.save();
//     res.status(200).json({
//       ...user._doc,
//       password: null
//     });
//   } catch (error) {
//     next(error);
//   }
// }

export const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { password } = req.body;

    let isPasswordMatch = await user.checkPassword(password);
    if (!isPasswordMatch) return next(ApiError.forbidden('Wrong password.'));

    await Todo.remove({ userId: user._id });
    await user.delete();
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
