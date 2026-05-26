import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const storePath = path.resolve('db_fallback.json');

// Establish the fallback JSON database file
if (!fs.existsSync(storePath)) {
  fs.writeFileSync(storePath, JSON.stringify({ users: [], tasks: [] }, null, 2));
}

export const getStore = () => {
  try {
    const data = fs.readFileSync(storePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { users: [], tasks: [] };
  }
};

export const saveStore = (store) => {
  try {
    fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
  } catch (err) {
    console.error('Error saving fallback database:', err);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devflow');
    console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
    global.dbMode = 'mongodb';
  } catch (error) {
    console.log(`⚠️ Database Warning: Local MongoDB daemon not active at 127.0.0.1:27017.`);
    console.log(`🚀 Bootstrapping DevFlow in Sandbox Fail-Safe Local Store Mode (db_fallback.json)!`);
    console.log(`💡 Note: Register, login, protected routes, and console deductions will work perfectly!`);
    global.dbMode = 'fallback';
  }
};

export default connectDB;
