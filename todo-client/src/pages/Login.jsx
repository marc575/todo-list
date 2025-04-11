import React from 'react'
import LoginForm from '../components/LoginForm'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function Login() {
  const location = useLocation();
  const { user } = useAuth();

    if (user) {
        return <Navigate to="/dashboard" replace state={{ from: location }} />;
    }
  return (
    <div className="hero min-h-screen">
      <div className="hero-content">
        <div className="max-w-md">
            <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
