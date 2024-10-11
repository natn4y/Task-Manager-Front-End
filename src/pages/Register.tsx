import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/authenticate/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      toast.success("Registration successful");
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-[-72px] px-6 w-full max-w-md"
      >
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="px-8 py-12">
            <h1 className="mb-8 font-extrabold text-4xl text-black text-center">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FiUser className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Username"
                  className="border-gray-300 py-3 pr-4 pl-10 border rounded-lg w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <FiMail className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="border-gray-300 py-3 pr-4 pl-10 border rounded-lg w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="border-gray-300 py-3 pr-12 pl-10 border rounded-lg w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              <div className="relative">
                <FiLock className="top-1/2 left-3 absolute text-gray-400 transform -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="border-gray-300 py-3 pr-12 pl-10 border rounded-lg w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                className="bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 py-3 rounded-lg w-full font-semibold text-white transition duration-300 ease-in-out"
              >
                Register
              </motion.button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
