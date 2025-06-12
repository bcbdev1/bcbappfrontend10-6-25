import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import GetStarted from './pages/GetStarted';
import Dashboard from './pages/Dashboard/Dashboard';
import Help from './pages/Dashboard/Help'; 
import Projects from './pages/Dashboard/Projects';
import Settings from './pages/Dashboard/Settings';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import TestingDashboard from './pages/Dashboard/TestingDashboard';
import AuditDetailsPage from './pages/AuditDetailsPage';
import { useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { WorkflowProvider } from './context/WorkflowContext';
import CursorEffect from './components/effects/CursorEffect';

function App() {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <AuthProvider>
      <WorkflowProvider>
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-background-dark text-text-dark' : 'bg-gray-300 text-text-light'} transition-colors duration-300`}>
          <CursorEffect />
          
          <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/verify" element={<OTPVerificationPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/dashboard" element={<Dashboard />} /> 
                <Route path="/help" element={<Help />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/testing" element={<TestingDashboard />} />
                <Route path="/audit/:id" element={<AuditDetailsPage />} />
              </Routes>
          </AnimatePresence>
        </div>
      </WorkflowProvider>
    </AuthProvider>
  );
}

export default App;