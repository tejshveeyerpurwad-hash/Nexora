import Task from '../models/Task.js';
import User from '../models/User.js';
import { getStore, saveStore } from '../config/db.js';

// @desc    Trigger a new autonomous AI agent task with OpenAI code generation
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const instruction = req.body.instruction || req.body.title;

    if (!instruction) {
      return res.status(400).json({ error: 'Please provide instructions' });
    }

    // Deduct compute credits from the user
    if (global.dbMode === 'fallback') {
      const store = getStore();
      const userIndex = store.users.findIndex(u => u._id === req.user._id);

      if (userIndex === -1) {
        return res.status(404).json({ error: 'User profile mismatch' });
      }

      if (store.users[userIndex].credits < 100) {
        return res.status(402).json({ error: 'Insufficient compute credits. Upgrade plan to get more credit limits.' });
      }

      store.users[userIndex].credits -= 100;
      saveStore(store);
    } else {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.credits < 100) {
        return res.status(402).json({ error: 'Insufficient compute credits. Upgrade plan to get more credit limits.' });
      }

      user.credits -= 100;
      await user.save();
    }

    let generatedCode = '';
    let systemLogMsg = '';

    // Check if OpenAI Key is configured
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && apiKey.trim() !== '' && apiKey !== 'YOUR_OPENAI_KEY_HERE') {
      try {
        console.log(`🤖 Communicating with OpenAI API for instruction: "${instruction}"`);
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo', // lightweight, fast, and cost-effective
            messages: [
              {
                role: 'system',
                content: 'You are Nexora, a premium software engineering agent. Return ONLY clean, valid, professional production-grade JavaScript/React/Node.js code. Do NOT wrap in markdown code blocks or backticks. Just output the raw code directly. Keep comments brief and focus on clean structure.'
              },
              {
                role: 'user',
                content: `Generate premium complete code for this task: "${instruction}"`
              }
            ],
            temperature: 0.2
          })
        });

        if (response.ok) {
          const data = await response.json();
          generatedCode = data.choices[0].message.content;
          systemLogMsg = 'Success! Code compilation fetched dynamically from OpenAI API.';
        } else {
          const errorData = await response.json();
          console.warn('OpenAI API returned error:', errorData);
          throw new Error(errorData.error?.message || 'OpenAI completion request failed');
        }
      } catch (apiErr) {
        console.warn('OpenAI API connection failed, falling back to Sandbox Generator:', apiErr.message);
        systemLogMsg = `⚠️ OpenAI Connection Failed (${apiErr.message}). Using Sandbox Fallback Engine.`;
        generatedCode = generateFallbackCode(instruction);
      }
    } else {
      console.log('💡 OpenAI API Key not configured. Using Sandbox template engine fallback.');
      systemLogMsg = '💡 OpenAI API Key not configured. Using Sandbox template engine fallback.';
      generatedCode = generateFallbackCode(instruction);
    }

    // Save task history
    if (global.dbMode === 'fallback') {
      const store = getStore();
      const newTask = {
        _id: 'tsk_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        userId: req.user._id,
        instruction,
        title: instruction,
        status: 'completed',
        logs: [
          { type: 'info', text: 'Nexora workspace trigger request accepted.', timestamp: new Date().toISOString() },
          { type: 'info', text: 'Indexing local codebase directory contexts...', timestamp: new Date().toISOString() },
          { type: 'success', text: systemLogMsg, timestamp: new Date().toISOString() }
        ],
        generatedCode,
        costCredits: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      store.tasks.push(newTask);
      saveStore(store);

      return res.status(201).json(newTask);
    }

    // Standard MongoDB path
    const task = await Task.create({
      userId: req.user._id,
      instruction,
      status: 'completed',
      logs: [
        { type: 'info', text: 'Nexora workspace trigger request accepted.' },
        { type: 'info', text: 'Indexing local codebase directory contexts...' },
        { type: 'success', text: systemLogMsg }
      ],
      generatedCode,
      costCredits: 100,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper: Intelligent Fallback Code generator based on user request keywords
const generateFallbackCode = (instruction) => {
  const instr = instruction.toLowerCase();
  
  if (instr.includes('auth') || instr.includes('login') || instr.includes('passport')) {
    return `// Nexora sandbox compiled output
// Task: "${instruction}"
// Mode: Sandbox Fallback Engine (OAuth2 & JWT Auth Specialist)

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // 1. Verify developer account details
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid authentication credentials' });
    }
    
    // 2. Decode password hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid authentication credentials' });
    }
    
    // 3. Issue signed JWT session token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(200).json({
      success: true,
      token,
      profile: { name: user.name, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;`;
  }
  
  if (instr.includes('db') || instr.includes('mongoose') || instr.includes('schema') || instr.includes('mongo')) {
    return `// Nexora sandbox compiled output
// Task: "${instruction}"
// Mode: Sandbox Fallback Engine (Mongoose Schema Compiler)

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: [true, 'Product title required'],
      trim: true
    },
    price: {
      type: Number,
      required: true,
      default: 0.00
    },
    active: {
      type: Boolean,
      default: true
    },
    inventory: {
      type: Number,
      default: 100
    }
  },
  {
    timestamps: true
  }
);

export const Product = mongoose.model('Product', productSchema);`;
  }

  if (instr.includes('stripe') || instr.includes('payment') || instr.includes('webhook')) {
    return `// Nexora sandbox compiled output
// Task: "${instruction}"
// Mode: Sandbox Fallback Engine (Stripe API Gateway Integrator)

import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    // Authenticate signature against Stripe platform
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }
  
  // Handle matching checkout hooks
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log(\`💰 Payment successful for checkout session: \${session.id}\`);
    // Upgrade compute credit boundaries or user subscriptions here
  }
  
  res.json({ received: true });
});

export default router;`;
  }

  // Default elegant boilerplate if no keyword matches
  return `// Nexora sandbox compiled output
// Task: "${instruction}"
// Mode: Sandbox Fallback Engine

import { getStore } from '../config/db.js';

export const handleWorkerRequest = async (req, res) => {
  const { action, payload } = req.body;
  console.log(\`⚡ Task execution started: "${instruction}"\`);
  
  try {
    const result = {
      status: "completed",
      instruction: "${instruction}",
      executedBy: "nexora-worker-edge",
      timestamp: new Date().toISOString()
    };
    
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};`;
};

// @desc    Get all user triggered AI tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    if (global.dbMode === 'fallback') {
      const store = getStore();
      const tasks = store.tasks
        .filter(t => t.userId === req.user._id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.json(tasks);
    }

    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get individual task status and full logs
// @route   GET /api/tasks/:id
// @access  Private
export const getTaskById = async (req, res) => {
  try {
    if (global.dbMode === 'fallback') {
      const store = getStore();
      const task = store.tasks.find(t => t._id === req.params.id);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      if (task.userId !== req.user._id) {
        return res.status(401).json({ error: 'Not authorized to view this resource' });
      }

      return res.json(task);
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized to view this resource' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
