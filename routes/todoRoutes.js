import express from 'express';

import {
  completeTodo,
  createTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from '../controllers/todos.js';
import checkValidationErrors from '../middleware/checkValidationErrors.js';
import createSchema from '../schemas/todo/createSchema.js';
import editSchema from '../schemas/todo/editSchema.js';

const todoRouter = express.Router();

todoRouter.get('/', getTodos);
todoRouter.delete('/:todoId/delete', deleteTodo);
todoRouter.patch('/:todoId/complete', completeTodo);
todoRouter.post('/create', createSchema, checkValidationErrors, createTodo);
todoRouter.patch('/:todoId/edit', editSchema, checkValidationErrors, editTodo);

export default todoRouter;
