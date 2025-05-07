import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '../components/Auth/AuthForm';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-6 pb-12">
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="G-Easy Logo" className="h-10 w-10" />
            <span className="ml-2 text-2xl font-bold text-orange-500">G-EASY</span>
          </div>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default RegisterPage;
