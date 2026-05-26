import express from 'express';
import { createTask, getTasks, getTaskById } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTask)
  .get(protect, getTasks);

router.route('/:id')
  .get(protect, getTaskById);

export default router;
