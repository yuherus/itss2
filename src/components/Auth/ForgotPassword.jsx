import { useState } from 'react';
import { supabase } from '../../supabaseClient';

const ForgotPassword = ({ switchToLogin }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) throw error;
      
      setMessage('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
      <div className="rounded-md shadow-sm">
        <div>
          <label htmlFor="reset-email" className="sr-only">Email</label>
          <input
            id="reset-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}

      {message && (
        <div className="text-sm text-green-600">
          {message}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Đang gửi...' : 'Gửi email đặt lại mật khẩu'}
        </button>
      </div>

      <div className="text-sm text-center">
        <button
          type="button"
          onClick={switchToLogin}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Quay lại đăng nhập
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
