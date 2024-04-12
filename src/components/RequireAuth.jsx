import React from 'react'
import useAuth from '../hooks/useAuth.js';
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const {accessToken} = useAuth();
    const location = useLocation();

  return (
     accessToken ? 
        <Outlet />
        :
        <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
