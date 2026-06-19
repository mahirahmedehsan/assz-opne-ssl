const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI not set — skipping database connection. Only health endpoint will work.');
    return;
  }

  try {
    mongoose.set('bufferCommands', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message} — API routes requiring DB will return errors.`);
  }
};

module.exports = connectDB;
