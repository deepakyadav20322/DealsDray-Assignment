import React, { useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
  const token  =localStorage.getItem('token');
  const location = useLocation();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      return toast.error('Email and password are required');
    }

    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters long');
    }

    // Perform login logic using formData
    try {
        
      const response = await axios.post(`http://localhost:3000/login`,formData,{
        headers:{
            'Content-Type': 'application/json'
        }
      });
      if (response.status==200) {
        toast.success('Login Successfully');
        localStorage.setItem('token',response.data.token);
        navigate('/dashboard') 
        setFormData({
          email: '',
          password: '',
          name: ''
        });
        
      }
    } catch (error) {
      
      if(error.response.status==400){
        toast.error(error.response.data.message);
      }else{
     
      toast.error('An error occurred. Please try again.');
      }
    }
    
  };

  return (
    <>
    
    {token?
      <Navigate to={'/dashboard'}  state={{ from: location }} replace/>:
    <div className="min-h-[calc(100vh-64px)] flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 md:mt-6">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Sign in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-1">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
         
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
     
    </div>
     }</>
  );
};

export default LoginPage;
