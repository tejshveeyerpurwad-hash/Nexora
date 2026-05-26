import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getStore } from '../config/db.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from Bearer scheme
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devflow_jwt_secret_key_1234');

      if (global.dbMode === 'fallback') {
        const store = getStore();
        const user = store.users.find(u => u._id === decoded.id);
        if (!user) {
          return res.status(401).json({ error: 'Not authorized, user not found' });
        }
        const { password, ...safeUser } = user;
        req.user = safeUser;
        return next();
      }

      // Fetch user context from decoded JWT
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ error: 'Not authorized, user database mismatch' });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Not authorized, token validation failed' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, missing authorization bearer token' });
  }
};
