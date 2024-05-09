import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const Protected = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default Protected;
