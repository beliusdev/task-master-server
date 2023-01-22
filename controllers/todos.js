import Todo from '../models/Todo.js';
import ApiError from '../errors/ApiError.js';

export const createTodo = async (req, res, next) => {
  try {
    const user = req.user;
    const { title, description } = req.body;

    const todo = await Todo.create({
      title,
      description,
      userId: user._id,
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId);

    if (!todo) return next(ApiError.notFound('Task was not found.'));

    await todo.delete();
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

export const editTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const { title, description } = req.body;
    const todo = await Todo.findById(todoId);

    if (!todo) return next(ApiError.notFound('Task was not found.'));

    todo.title = title;
    todo.description = description;
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (req, res, next) => {
  try {
    const user = req.user;
    const todos = await Todo.find({ userId: user._id });

    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

export const completeTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId);

    if (!todo) return next(ApiError.notFound('Task was not found.'));

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};
