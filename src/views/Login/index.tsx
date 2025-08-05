import React, { useState, useEffect, ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest, loginSuccess } from '../../slices/auth';
import { RootState } from '../../store';
import LogoEco from '../../assets/img/Ecomove_Logo.png';
import {
  IoEyeOffOutline as _IoEyeOffOutline,
  IoEyeOutline as _IoEyeOutline,
} from 'react-icons/io5';

const LoginPage: React.FC = () => {
  const IoEyeOffOutline = _IoEyeOffOutline as ComponentType<{ className?: string }>;
  const IoEyeOutline = _IoEyeOutline as ComponentType<{ className?: string }>;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/home', { replace: true });
  //   }
  // }, [isAuthenticated, navigate]);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rememberEmail) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    console.log('Payload sent from LoginPage:', { email, password });
    dispatch(loginRequest({ email, password }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-poppins bg-gradient-to-b from-green-900 to-green-300">
      <div className="relative bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col justify-between aspect-square">
        <div>
          <div className="flex flex-row justify-between items-center mb-6">
            <div className="flex flex-col items-start">
              <h2 className="text-4xl font-bold text-gray-800">Sign in</h2>
            </div>
            <img src={LogoEco} alt="Ecomove Logo" className="h-16 w-auto" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>{' '}
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10 bg-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="h-5 w-5" />
                ) : (
                  <IoEyeOutline className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600 rounded mr-2"
                  checked={rememberEmail}
                  onChange={(e) => setRememberEmail(e.target.checked)}
                />
                Remember email
              </label>
              <a href="#" className="text-green-600 hover:underline">
                Forgot password?
              </a>{' '}
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Tombol submit harus berada di dalam form atau memiliki type="submit" */}
            {/* Hapus onClick={handleSubmit} dari sini */}
            <button
              type="submit" // Pastikan type="submit" ada
              // onClick={handleSubmit}
              className="w-full bg-[#5e9142] text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-[#4e7a36] focus:outline-none focus:ring-2 focus:ring-[#5e9142] focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Bagian ini tidak diperlukan jika tombol submit sudah di dalam form */}
        {/* <div className="mt-auto space-y-2"></div> */}
      </div>
    </div>
  );
};

export default LoginPage;
