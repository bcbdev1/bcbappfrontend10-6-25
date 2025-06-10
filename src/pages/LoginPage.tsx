import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Sun, Moon } from 'lucide-react';
import AuthCard from '../components/ui/AuthCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import apiClient from '../lib/api';

const LoginPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    };

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await apiClient.post('/login', {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('otp_email', formData.email);
      navigate('/verify');
      
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Invalid email or password';
      setErrors({
        email: message,
        password: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glowing Background Elements */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-secondary-dark/20 dark:bg-secondary-light/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent-dark/20 dark:bg-accent-light/20 rounded-full blur-3xl animate-pulse-slow" />
      </motion.div>

      {/* Theme toggle button */}
      <motion.button
        className="fixed top-4 right-4 p-2 rounded-full bg-[#e0e0e0] dark:bg-surface-light/50 backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
      >
        {theme === 'dark' ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-indigo-600" />
        )}
      </motion.button>

      <AuthCard
        title="Welcome Back!"
        subtitle="Sign in to continue your journey"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            leftIcon={<Mail className="w-5 h-5" />}
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            error={errors.email}
            required
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            leftIcon={<Lock className="w-5 h-5" />}
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            error={errors.password}
            required
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-secondary-dark dark:text-secondary-light hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Sign In
          </Button>

          <p className="text-center text-sm">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-secondary-dark dark:text-secondary-light hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
};

export default LoginPage;