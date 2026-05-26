import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getStore, saveStore } from '../config/db.js';

// Helper to generate secure JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'devflow_jwt_secret_key_1234', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (global.dbMode === 'fallback') {
      const store = getStore();
      const userExists = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (userExists) {
        return res.status(400).json({ error: 'User account already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        _id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || 'developer',
        credits: 10000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      store.users.push(newUser);
      saveStore(store);

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        credits: newUser.credits,
        token: generateToken(newUser._id),
      });
    }

    // Standard MongoDB path
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User account already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'developer',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      credits: user.credits,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Authenticate user and get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }

    if (global.dbMode === 'fallback') {
      const store = getStore();
      const user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        credits: user.credits,
        token: generateToken(user._id),
      });
    }

    // Standard MongoDB path
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      credits: user.credits,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get user profile details
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    if (global.dbMode === 'fallback') {
      const store = getStore();
      const user = store.users.find(u => u._id === req.user._id);
      if (user) {
        const { password, ...safeUser } = user;
        return res.json(safeUser);
      } else {
        return res.status(404).json({ error: 'User profile not found' });
      }
    }

    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
