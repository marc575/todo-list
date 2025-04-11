import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function Register() {
    const location = useLocation();
    const { user } = useAuth();
  
    if (user) {
        return <Navigate to="/dashboard" replace state={{ from: location }} />;
    }
  return (
    <div className="hero min-h-screen">
      <div className="hero-content">
        <div className="max-w-xl">
            <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default Register
