import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    instruction: {
      type: String,
      required: [true, 'Please provide instructions for the agent'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    logs: [
      {
        type: {
          type: String,
          enum: ['info', 'success', 'warning', 'error'],
          default: 'info',
        },
        text: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    generatedCode: {
      type: String,
    },
    costCredits: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
