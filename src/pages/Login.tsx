import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loading, isAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/authenticate/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-[-72px] px-6 w-full max-w-md"
      >
        <div className="bg-white overflow-hidden">
          <div className="px-8 py-12">
            <h1 className="mb-8 font-extrabold text-4xl text-black text-center">
              Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FiMail className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="border-gray-300 py-3 pr-4 pl-10 border rounded-lg w-full transition duration-300 ease-in-out"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <FiLock className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border-gray-300 py-3 pr-12 pl-10 border rounded-lg w-full transition duration-300 ease-in-out"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 transform transition -translate-y-1/2 duration-300 ease-in-out"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="border-white mr-2 border-t-2 border-b-2 rounded-full w-5 h-5 animate-spin"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </motion.button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="font-medium text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}