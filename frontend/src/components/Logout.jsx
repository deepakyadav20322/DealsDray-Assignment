import React,{useContext,useEffect} from 'react'

import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Logout = () => {
    const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext)
    useEffect(() => {
        const tokenExists = localStorage.getItem("token");
    
        if (tokenExists  ) {
          localStorage.removeItem("token");
          setIsLoggedIn(false)
          window.location.replace("/login");
        } 
      }, []);
    
  return (
    <div>


    </div>
  )
}

export default Logout