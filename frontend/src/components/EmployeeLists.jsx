import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
const EmployeeLists = () => {

  const token = JSON.parse(localStorage.getItem('token')?localStorage.getItem('token'):"") 


  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // delete the employee--------------
  const employeeDelete = async(id)=>{
  
    try {
      const response = await axios.delete(`http://localhost:3000/deleteEmployee/${id}`,{
        headers:{
          'Authorization':`Bearer ${token?.tokenValue}`,
        }
      }
      ); // Replace '/api/employees' with 
      if (response.status==200) {          
        console.log(response.data.message);
        toast.success('Employee deleted successfully')
        setTimeout(()=>{
          window.location.reload();
        },1500);
  
      } else {
        toast.error('Failed to fetch employees');
      }
    } catch (error) {
      toast.error('Internal server error');
      console.error('Error fetching employees:', error);
     
    }

  }


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3000/getAllEmployee',{
          headers:{
            'Authorization':`Bearer ${token?.tokenValue}`,
          }
        }
        ); // Replace '/api/employees' with 
        if (response.status==200) {          
          setEmployees(response.data.data);
          console.log(response.data);
          setLoading(false)
        } else {
          throw new Error('Failed to fetch employees');
        }
      } catch (error) {
        toast.error('Internal server error');
        console.error('Error fetching employees:', error);
        setLoading(false)
      }finally{
        setLoading(false)
      }
    };

    fetchEmployees();
  }, []);


  
  return (
    <div className="overflow-x-auto mt-4">
      {loading?<h2>Loading................</h2>:
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No.</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {employees && employees.map((employee, index) => (
          <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} border-[1px] border-slate-300`}>
            <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
            <td className="px-6 py-4 whitespace-nowrap"><img src={`http://localhost:3000/Images/${employee.image}`} className="rounded-full border-gray-300 border-[1px] w-10 h-10" alt="Employee" /></td>
            <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{employee.mobileNo}</td>
            <td className="px-6 py-4 whitespace-nowrap">{employee.designation}</td>
            <td className="px-6 py-4 whitespace-nowrap">{employee.gender}</td>
            <td className="px-6 py-4 whitespace-nowrap">{employee.course.join(', ')}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Link to={`/dashboard/employeeUpdate/${employee._id}`} className="text-blue-600 hover:text-blue-900 mr-2">Update</Link>
              <button onClick={(e)=>employeeDelete(employee._id)} className="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        ))}
        
      </tbody>
     {employees.length==0 &&<div className='text-center mt-6 text-xl font-semiblod '>No Employee data availabels</div>}
    </table>
}
  </div>
  );
};

export default EmployeeLists;
