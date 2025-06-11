import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Key, 
  Globe, 
  Moon, 
  Sun, 
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  AlertTriangle,
  CheckCircle,
  X,
  Palette,
  Monitor,
  Database,
  Wifi,
  Download,
  Upload,
  Trash2
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: 'Test User',
    email: 'test@example.com',
    company: 'BCBUZZ Technologies',
    phone: '+1 (555) 123-4567',
    timezone: 'UTC-5 (Eastern Time)',
    language: 'English',
    avatar: null as File | null
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    loginAlerts: true,
    sessionTimeout: '30',
    ipWhitelist: true,
    deviceTracking: true
  });

  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    scanCompleted: true,
    vulnerabilityFound: true,
    weeklyReports: true,
    securityAlerts: true,
    maintenanceUpdates: false,
    marketingEmails: false,
    auditReminders: true,
    teamUpdates: true
  });

  const [apiData, setApiData] = useState({
    apiKey: 'bcbuzz_sk_1234567890abcdef',
    webhookUrl: 'https://your-app.com/webhook',
    rateLimitEnabled: true,
    ipWhitelist: '192.168.1.0/24, 10.0.0.0/8',
    apiVersion: 'v2',
    maxRequests: '1000'
  });

  const [appearanceData, setAppearanceData] = useState({
    theme: theme,
    accentColor: 'blue',
    fontSize: 'medium',
    compactMode: false,
    animations: true,
    highContrast: false
  });

  const handleSave = (section: string) => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const generateNewApiKey = () => {
    const newKey = 'bcbuzz_sk_' + Math.random().toString(36).substring(2, 18);
    setApiData({ ...apiData, apiKey: newKey });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData({ ...profileData, avatar: file });
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 'security', label: 'Security', icon: Shield, color: 'from-red-500 to-pink-500' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'from-yellow-500 to-orange-500' },
    { id: 'api', label: 'API & Integrations', icon: Key, color: 'from-purple-500 to-indigo-500' },
    { id: 'appearance', label: 'Appearance', icon: Palette, color: 'from-green-500 to-emerald-500' },
    { id: 'data', label: 'Data & Privacy', icon: Database, color: 'from-gray-500 to-slate-500' }
  ];

  const accentColors = [
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
    { name: 'Green', value: 'green', color: 'bg-green-500' },
    { name: 'Red', value: 'red', color: 'bg-red-500' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
    { name: 'Pink', value: 'pink', color: 'bg-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark transition-all duration-500">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light bg-clip-text text-transparent mb-4">
            Settings
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            Customize your experience and manage your account preferences
          </p>
        </motion.div>

        {/* Success Message */}
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 right-4 z-50 bg-green-500/20 border border-green-500/30 text-green-400 px-6 py-4 rounded-xl flex items-center gap-3 backdrop-blur-xl"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Settings saved successfully!</span>
            <button onClick={() => setShowSuccessMessage(false)}>
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 sticky top-6">
              <nav className="space-y-3">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-secondary-dark/20 to-accent-dark/20 text-secondary-dark dark:text-secondary-light border border-secondary-dark/30 dark:border-secondary-light/30'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabBg"
                          className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-10 rounded-xl`}
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <div className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg` 
                          : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium relative z-10">{tab.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="ml-auto w-2 h-2 bg-secondary-dark dark:bg-secondary-light rounded-full"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/30">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
                      <p className="text-gray-600 dark:text-gray-400">Manage your personal information and preferences</p>
                    </div>
                  </div>

                  {/* Avatar Upload */}
                  <div className="flex items-center gap-6 p-6 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {profileData.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <button className="absolute -bottom-1 -right-1 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                        <Upload className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Profile Picture</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Upload a new avatar for your profile</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        Choose File
                      </label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Company
                      </label>
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Timezone
                      </label>
                      <select
                        value={profileData.timezone}
                        onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                      >
                        <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</option>
                        <option value="UTC-6 (Central Time)">UTC-6 (Central Time)</option>
                        <option value="UTC-7 (Mountain Time)">UTC-7 (Mountain Time)</option>
                        <option value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Language
                      </label>
                      <select
                        value={profileData.language}
                        onChange={(e) => setProfileData({...profileData, language: e.target.value})}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => handleSave('profile')}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </motion.button>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Settings</h2>
                      <p className="text-gray-600 dark:text-gray-400">Protect your account with advanced security features</p>
                    </div>
                  </div>
                  
                  {/* Change Password */}
                  <div className="p-6 border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <Lock className="w-5 h-5" />
                      Change Password
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={securityData.currentPassword}
                            onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                            className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all backdrop-blur-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={securityData.newPassword}
                            onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                            className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all backdrop-blur-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={securityData.confirmPassword}
                            onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                            className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all backdrop-blur-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { 
                        key: 'twoFactorEnabled', 
                        label: 'Two-Factor Authentication', 
                        description: 'Add an extra layer of security with 2FA',
                        icon: Smartphone,
                        color: 'text-green-500'
                      },
                      { 
                        key: 'loginAlerts', 
                        label: 'Login Alerts', 
                        description: 'Get notified of new login attempts',
                        icon: Bell,
                        color: 'text-blue-500'
                      },
                      { 
                        key: 'ipWhitelist', 
                        label: 'IP Whitelisting', 
                        description: 'Restrict access to trusted IP addresses',
                        icon: Wifi,
                        color: 'text-purple-500'
                      },
                      { 
                        key: 'deviceTracking', 
                        label: 'Device Tracking', 
                        description: 'Monitor and manage logged-in devices',
                        icon: Monitor,
                        color: 'text-orange-500'
                      }
                    ].map((item) => (
                      <motion.div
                        key={item.key}
                        className="p-6 border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-700 ${item.color}`}>
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{item.label}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={securityData[item.key as keyof typeof securityData] as boolean}
                              onChange={(e) => setSecurityData({...securityData, [item.key]: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
                          </label>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button
                    onClick={() => handleSave('security')}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Save className="w-5 h-5" />
                    Save Security Settings
                  </motion.button>
                </motion.div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <Palette className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Appearance</h2>
                      <p className="text-gray-600 dark:text-gray-400">Customize the look and feel of your interface</p>
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <div className="p-6 border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { name: 'Light', value: 'light', icon: Sun, preview: 'bg-white border-gray-200' },
                        { name: 'Dark', value: 'dark', icon: Moon, preview: 'bg-gray-900 border-gray-700' },
                        { name: 'System', value: 'system', icon: Monitor, preview: 'bg-gradient-to-r from-white to-gray-900' }
                      ].map((themeOption) => (
                        <motion.button
                          key={themeOption.value}
                          onClick={() => {
                            if (themeOption.value !== 'system') {
                              setAppearanceData({...appearanceData, theme: themeOption.value});
                              if (themeOption.value !== theme) toggleTheme();
                            }
                          }}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            (themeOption.value === theme) || (themeOption.value === 'system' && appearanceData.theme === 'system')
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`w-full h-20 rounded-lg mb-3 ${themeOption.preview} border`}></div>
                          <div className="flex items-center gap-2 justify-center">
                            <themeOption.icon className="w-4 h-4" />
                            <span className="font-medium">{themeOption.name}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="p-6 border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Accent Color</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {accentColors.map((color) => (
                        <motion.button
                          key={color.value}
                          onClick={() => setAppearanceData({...appearanceData, accentColor: color.value})}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            appearanceData.accentColor === color.value
                              ? 'border-gray-400 dark:border-gray-500'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className={`w-8 h-8 rounded-full ${color.color} mx-auto mb-2`}></div>
                          <span className="text-sm font-medium">{color.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Display Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { 
                        key: 'compactMode', 
                        label: 'Compact Mode', 
                        description: 'Reduce spacing for more content',
                        icon: Monitor
                      },
                      { 
                        key: 'animations', 
                        label: 'Animations', 
                        description: 'Enable smooth transitions and effects',
                        icon: Palette
                      },
                      { 
                        key: 'highContrast', 
                        label: 'High Contrast', 
                        description: 'Improve accessibility with higher contrast',
                        icon: Eye
                      }
                    ].map((item) => (
                      <motion.div
                        key={item.key}
                        className="p-6 border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{item.label}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={appearanceData[item.key as keyof typeof appearanceData] as boolean}
                              onChange={(e) => setAppearanceData({...appearanceData, [item.key]: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                          </label>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    onClick={() => handleSave('appearance')}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Save className="w-5 h-5" />
                    Save Appearance Settings
                  </motion.button>
                </motion.div>
              )}

              {/* Other tabs content would go here... */}
              {/* For brevity, I'll include the save button pattern for other tabs */}
              
              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <Bell className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Preferences</h2>
                      <p className="text-gray-600 dark:text-gray-400">Control how and when you receive notifications</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email', icon: Mail },
                      { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications', icon: Bell },
                      { key: 'smsNotifications', label: 'SMS Notifications', description: 'Text message alerts for critical issues', icon: Smartphone },
                      { key: 'scanCompleted', label: 'Scan Completed', description: 'Notify when security scans finish', icon: CheckCircle },
                      { key: 'vulnerabilityFound', label: 'Vulnerability Alerts', description: 'Immediate alerts for new vulnerabilities', icon: AlertTriangle },
                      { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly security summary reports', icon: Mail },
                      { key: 'securityAlerts', label: 'Security Alerts', description: 'Critical security notifications', icon: Shield },
                      { key: 'auditReminders', label: 'Audit Reminders', description: 'Reminders for scheduled audits', icon: Bell },
                      { key: 'teamUpdates', label: 'Team Updates', description: 'Updates from your security team', icon: User },
                      { key: 'maintenanceUpdates', label: 'Maintenance Updates', description: 'System maintenance notifications', icon: Globe },
                      { key: 'marketingEmails', label: 'Marketing Emails', description: 'Product updates and promotional content', icon: Mail }
                    ].map((item) => (
                      <motion.div
                        key={item.key}
                        className="p-6 border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{item.label}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationData[item.key as keyof typeof notificationData]}
                              onChange={(e) => setNotificationData({...notificationData, [item.key]: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-500"></div>
                          </label>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button
                    onClick={() => handleSave('notifications')}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Save className="w-5 h-5" />
                    Save Notification Settings
                  </motion.button>
                </motion.div>
              )}

              {/* Data & Privacy Tab */}
              {activeTab === 'data' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-gray-500 to-slate-500 text-white">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data & Privacy</h2>
                      <p className="text-gray-600 dark:text-gray-400">Manage your data and privacy preferences</p>
                    </div>
                  </div>

                  {/* Data Export */}
                  <div className="p-6 border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Export</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Download a copy of your data including audit reports, settings, and account information.</p>
                    <motion.button
                      className="flex items-center gap-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-5 h-5" />
                      Export My Data
                    </motion.button>
                  </div>

                  {/* Danger Zone */}
                  <div className="p-6 border border-red-200/50 dark:border-red-800/50 rounded-xl bg-red-50/30 dark:bg-red-900/20 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-4 flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5" />
                      Danger Zone
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-red-100/50 dark:bg-red-900/30 rounded-lg">
                        <div>
                          <p className="font-semibold text-red-800 dark:text-red-400">Delete Account</p>
                          <p className="text-sm text-red-600 dark:text-red-300">Permanently delete your account and all associated data. This action cannot be undone.</p>
                        </div>
                        <motion.button
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Account
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;