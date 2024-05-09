const Employee = require('../db/EmployeeSchema');

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get single employee by ID
const getEmployeeById = async (req, res) => {

  try {
    const employeeId  = req.params.id ;
    console.log(employeeId,"empId")
 
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' ,error});
  }
};

// Create a new employee------------------------
const createEmployee = async (req, res) => {
  try {
    console.log(req.body);
const employeeData = req.body;
const  empImg = req.file.filename;
console.log(req.file.filename);
if(!empImg){
  return res.status(400).json({message:'Image is required'});
}
const {name,email, mobileNo,designation,gender,course} = req.body;
if(!name || !email || !mobileNo || !designation ||!gender || !course){
  return res.status(400).json({message:'All fields are required'});
}

// const refineEmployeeData = validateEmployeeData({...employeeData,image:empImg});
// if(refineEmployeeData.length==0){

    const newEmployee = new Employee({...employeeData,image:empImg});
    const savedEmployee = await newEmployee.save();
    res.status(200).json({ success: true, data: savedEmployee });

// else{
//   res.status(400).json({message:`${refineEmployeeData[0]}`})
// }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update an existing employee
const updateEmployee = async (req, res) => {
  try {
    console.log(req.params.id)
    console.log(req.body);
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.status(200).json({ success: true, data: updatedEmployee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.status(200).json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
