// src/components/Auth/AuthForm.jsx
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPassword from './ForgotPassword';

const AuthForm = () => {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'forgotPassword'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {authMode === 'login' && 'Đăng nhập'}
            {authMode === 'signup' && 'Đăng ký tài khoản'}
            {authMode === 'forgotPassword' && 'Quên mật khẩu'}
          </h2>
        </div>

        {authMode === 'login' && (
          <LoginForm 
            switchToSignup={() => setAuthMode('signup')} 
            switchToForgotPassword={() => setAuthMode('forgotPassword')} 
          />
        )}

        {authMode === 'signup' && (
          <SignupForm switchToLogin={() => setAuthMode('login')} />
        )}

        {authMode === 'forgotPassword' && (
          <ForgotPassword switchToLogin={() => setAuthMode('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthForm;
