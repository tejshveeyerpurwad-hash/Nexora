import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

// Setup environment configurations
dotenv.config();

// Establish connection to MongoDB database
connectDB();

const app = express();

// Set CORS and body parser middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// API route mappings
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    service: 'DevFlow AI Engine API',
  });
});

// Resource Not Found Fallback middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint resource not found' });
});

// General Global Error Handler middleware
app.use((err, req, res, next) => {
  console.error(`💥 System error logged: ${err.stack}`);
  res.status(500).json({ error: 'Internal server error occurred' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 DevFlow backend server successfully booted up on port ${PORT}`);
});
