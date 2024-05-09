const { timeStamp } = require('console');
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'],
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  course: {
    type: [String],
    enum: ['MCA', 'BCA', 'BSC']
  },
  image: {
    type: String // You can store the image URL here
  }
},
    {timeStamp:true}
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
