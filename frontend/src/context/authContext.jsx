import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

 const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      
        const tokens = localStorage.getItem('token');
        if (tokens) {
            setIsLoggedIn(true);
        } 
      }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn,setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider

  



export {AuthProvider}