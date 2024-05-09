import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  // const {tokenValue,user} = JSON.parse(localStorage.getItem("token"))
  const token = (localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):"") ;
  const [low,setLow] = useState(false)
  const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext)
 


  return (
    <nav className="bg-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className='text-lg font-bold'>Logo</h1>
          </div>
          {/* Links */}
          <div className="flex">
            <div className="flex space-x-4">
            <Link
                to="/"
                className="text-black border-2 border-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium  flex flex-row justify-center items-center"
              >
                Home
              </Link>
              {
                token && token?.tokenValue &&
<>
<Link to={'/dashboard/employeeCreate'} className='p-1 bg-green-600 border-[1px] border-black  hover:bg-green-400 text-white text-bold flex flex-row justify-center items-center  rounded-md'>Create Employee</Link>
<Link to={'/dashboard/employeeLists'} className='p-1 bg-green-600 border-[1px] border-black hover:bg-green-400 text-white text-bold flex flex-row justify-center items-center rounded-md'> Employee Lists</Link>
</>
              }
             
              <Link
                to={`${token?.tokenValue?'/logout':'/login'}`}
                className="text-black border-2 border-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex flex-row justify-center items-center"
              >
                {!token.tokenValue?"Login":"Logout"}
              </Link>
              {token?.tokenValue?"":
              <Link
                to="register"
                className="text-black border-2 border-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium  flex flex-row justify-center items-center"
              >
                Register
              </Link>
               }
               {token &&
                <div className='w-12 h-12 rounded-full border-black border-[2px] flex flex-col justify-center items-center text-2xl font-bold text-green-500'>
                 {(token?.user?.name.split("")[0])?.toUpperCase()}
                </div>
                }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
