import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // const {user} = JSON.parse(localStorage.getItem("token"));
  const token = JSON.parse(localStorage.getItem('token')?localStorage.getItem('token'):"") 
 
  return (
    <>
   
    <div>
        <div className='flex flex-col  justify-center items-center my-6'>
            <h1 className='text-3xl font-bold '>Welcome to the Admin Pannel</h1>
            <h2 className='text-xl text-green-500 font-bold'>Hello Admin {token?token?.user?.name:"_ _ _ _"}</h2>
          
        </div>
    </div>
    </>
  )
}
export default Dashboard
