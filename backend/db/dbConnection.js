const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    const uri = 'mongodb://127.0.0.1:27017/employee_Assignment';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB database');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = connectToMongoDB;
