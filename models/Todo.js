import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: '',
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('Todo', TodoSchema);
