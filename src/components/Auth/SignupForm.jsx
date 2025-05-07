import { useState } from 'react';
import { supabase } from '../../supabaseClient';

const SignupForm = ({ switchToLogin }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // Validate password match
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      setMessage('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSignup}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="signup-email" className="sr-only">Email</label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="sr-only">Mật khẩu</label>
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="sr-only">Xác nhận mật khẩu</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </div>

      <div className="text-sm text-center">
        <span className="text-gray-600">Đã có tài khoản? </span>
        <button
          type="button"
          onClick={switchToLogin}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Đăng nhập
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
