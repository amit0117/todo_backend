import mongoose from 'mongoose';
const todoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  due_date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo',
    default: null,
  },
});

todoSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updated_at = new Date();
  }
  next();
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
