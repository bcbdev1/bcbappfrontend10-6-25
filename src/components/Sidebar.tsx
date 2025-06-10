import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Scan,
  Settings,
  HelpCircle,
  LogOut,
  X,
  FolderOpen,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleNavigation: (id: string) => void;
  theme: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  handleNavigation,
  theme
}) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'scan', label: 'Scan', icon: Scan },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed left-0 top-0 h-full w-70 z-50 backdrop-blur-xl  ${
            theme === 'dark'
              ? 'bg-surface-dark/20 border-surface-secondary-dark/20 shadow-dark-elevated'
              : 'bg-surface-dark/20 border-surface-secondary-dark/20  shadow-xl'
          }`}
          style={{
            background:
              theme === 'dark'
                ? 'rgba(30, 41, 59, 0.8)'
                : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Logo */}
          <div
            className={`p-6 border-b ${
              theme === 'dark'
                ? 'border-surface-secondary-dark/20'
                : 'border-gray-200/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-xl flex items-center justify-center ${
                    theme === 'dark' ? 'shadow-glow' : 'shadow-lg'
                  }`}
                >
                  <span className="text-white font-bold text-lg">BC</span>
                </div>
                <div>
                  <h1
                    className={`text-xl font-bold bg-gradient-to-r from-secondary-dark to-accent-dark bg-clip-text text-transparent`}
                  >
                    BCBUZZ
                  </h1>
                  <p
                    className={`text-xs ${
                      theme === 'dark'
                        ? 'text-text-secondary-dark'
                        : 'text-text-secondary-light'
                    }`}
                  >
                    Security Platform
                  </p>
                </div>
              </div>
              {/* Close Button */}
              <motion.button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  theme === 'dark'
                    ? 'hover:bg-surface-secondary-dark/30 text-text-secondary-dark hover:text-text-dark'
                    : 'hover:bg-gray-100/50 text-text-secondary-light hover:text-text-light'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      handleNavigation(item.id);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-gradient-to-r from-secondary-dark/30 to-accent-dark/30 text-secondary-dark border border-secondary-dark/30 shadow-inner-glow backdrop-blur-sm'
                          : 'bg-gradient-to-r from-secondary-dark/30 to-accent-dark/30 text-blue-600 border border-blue-200/70 shadow-sm backdrop-blur-sm'
                        : theme === 'dark'
                          ? 'hover:bg-surface-secondary-dark/20 text-text-secondary-dark hover:text-text-dark backdrop-blur-sm'
                          : 'hover:bg-gray-50/50 text-text-secondary-light hover:text-text-light backdrop-blur-sm'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isActive ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="ml-auto w-2 h-2 bg-secondary-dark rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* User Profile & Logout */}
          <div
            className={`p-4 border-t ${
              theme === 'dark'
                ? 'border-surface-secondary-dark/20'
                : 'border-gray-200/20'
            }`}
          >
            <div
              className={`flex items-center space-x-3 p-3 rounded-xl backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-secondary-dark/20 to-accent-dark/20 border border-secondary-dark/20 shadow-dark-card'
                  : 'bg-gradient-to-r from-blue-50/50 to-sky-50/50 border border-blue-100/50'
              }`}
            >
              <div
                className={`w-10 h-10 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'shadow-glow' : 'shadow-lg'
                }`}
              >
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Test User</p>
                <p
                  className={`text-xs ${
                    theme === 'dark'
                      ? 'text-text-secondary-dark'
                      : 'text-text-secondary-light'
                  }`}
                >
                  test@bcbuzz.com
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <Link to={'/'} >
              <motion.button
                className={`w-full flex items-center space-x-3 px-4 py-3 mt-3 rounded-xl transition-all duration-200 ${
                  theme === 'dark'
                    ? 'hover:bg-error-dark/20 text-error-dark hover:text-red-300 border border-transparent hover:border-error-dark/30'
                    : 'hover:bg-red-50 text-red-600 hover:text-red-700 border border-transparent hover:border-red-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="w-5 h-5" />
                <Link className="font-medium" to={'/'}>Logout</Link>
              </motion.button> </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;