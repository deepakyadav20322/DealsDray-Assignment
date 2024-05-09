import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios'



const Register = () => {
  const token  =localStorage.getItem('token');
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate()

  const { name, email, password, confirmPassword } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Perform client-side validation
    if (!name || !email || !password || !confirmPassword) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
        return toast.error('Minimum 6 characters long password');
      }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    // Send registration data to the server........
    try {
        
      const response = await axios.post(`http://localhost:3000/register`,formData,{
        headers:{
            'Content-Type': 'application/json'
        }
      });
      
      if (response.status==200) {
        toast.success('Register Successfully');
        
        navigate('/login') 
       
        
      } else {
        toast.error("Something went wrong");
     
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };
  

  return (
    <>
    {token?
      <Navigate to={'/dashboard'}  state={{ from: location }} replace/>:
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl mb-4 font-bold text-center">User Registration</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-1">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-1">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300">Register</button>
      </form>
  
     
    </div>
    }
  </>
  );
};

export default Register;
