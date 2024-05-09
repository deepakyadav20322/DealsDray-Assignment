import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useNavigation} from 'react-router-dom';


const EmployeeCreate = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token')?localStorage.getItem('token'):"") 
  const [image,setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    course: [],
    image: null
  });



  const handleChange = (e) => {
    const { name, value, type, checked} = e.target;

    if (type === 'checkbox') {
      const updatedCourse = checked
        ? [...formData.course, value]
        : formData.course.filter(course => course !== value);

      setFormData({ ...formData, course: updatedCourse });
    } else {
      setFormData({ ...formData, [name]: value });
    }

  };

  const handleImageChange = (e) => {
    let profileImage = e.target.files[0]; // Assuming it's an input type file
    setImage(profileImage); // Assuming setImage is a function to set the image
}

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile No. is required';
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Invalid mobile number';
    }
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (formData.course.length === 0) {
      newErrors.course = 'Minimum one course selected';
    }

    if (Object.keys(newErrors).length === 0) {
      // Form submission logic goes here

      formData.image = image;
      console.log(formData);
     
      try {
        
        const response = await axios.post(`http://localhost:3000/employeeCreate`,formData,{
          headers:{
              'Content-Type': 'multipart/form-data',
              'Authorization':`Bearer ${token?.tokenValue}`
          }
        });
        
        if (response.status==200) {
          toast.success('Employee created Successfully');
          
          navigate('/dashboard/employeeLists') ;
         
          
        } else {
          toast.error("Something went wrong");
       
        }
      } catch (error) {
        if(error.response.status == 400){
          toast.error(error.response.data.message);
        }else{
        toast.error('Internal server error');
        }
      }
    } else {
      let topError = Object.values(newErrors)[0]
        toast.error(topError);
      }
    }
    
  return (
    <div className="max-w-lg mx-auto mt-8 bg-slate-100 px-4 md:px-12 py-3">
      <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mobileNo" className="block mb-1">Mobile No.</label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            maxLength={10}
            value={formData.mobileNo}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="designation" className="block mb-1">Designation</label>
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Gender</label>
          <div>
            <label className="inline-block mr-4">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              /> Male
            </label>
            <label className="inline-block mr-4">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              /> Female
            </label>
            <label className="inline-block mr-4">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={handleChange}
              /> Other
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Course</label>
          <div>
            <label className="inline-block mr-4">
              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={formData.course.includes('MCA')}
                onChange={handleChange}
              /> MCA
            </label>
            <label className="inline-block mr-4">
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={formData.course.includes('BCA')}
                onChange={handleChange}
              /> BCA
            </label>
            <label className="inline-block mr-4">
              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={formData.course.includes('BSC')}
                onChange={handleChange}
              /> BSC
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block mb-1">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Submit</button>
        </div>
      </form>
     
    </div>
  );
}


export default EmployeeCreate;
