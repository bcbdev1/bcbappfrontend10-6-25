import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Shield,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Settings,
  UserPlus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  Globe,
  Server,
  Database,
  Wifi,
  Smartphone
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'tester';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  auditsCount: number;
  joinDate: string;
}

interface Audit {
  id: string;
  name: string;
  client: string;
  type: 'web' | 'network' | 'mobile' | 'cloud';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  assignedTo: string;
  startDate: string;
  endDate?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data
  const stats = [
    {
      label: 'Total Users',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Active Audits',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: Shield,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'System Health',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: Activity,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      label: 'Revenue',
      value: '$124.5K',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      auditsCount: 25,
      joinDate: '2023-06-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-15 09:15',
      auditsCount: 12,
      joinDate: '2023-08-22'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'tester',
      status: 'inactive',
      lastLogin: '2024-01-10 16:45',
      auditsCount: 45,
      joinDate: '2023-03-10'
    }
  ];

  const audits: Audit[] = [
    {
      id: '1',
      name: 'E-commerce Security Audit',
      client: 'TechCorp Inc.',
      type: 'web',
      status: 'in-progress',
      assignedTo: 'Mike Johnson',
      startDate: '2024-01-10',
      priority: 'high',
      progress: 65
    },
    {
      id: '2',
      name: 'Network Infrastructure Review',
      client: 'SecureNet Ltd.',
      type: 'network',
      status: 'pending',
      assignedTo: 'Sarah Wilson',
      startDate: '2024-01-20',
      priority: 'medium',
      progress: 0
    },
    {
      id: '3',
      name: 'Mobile App Security Test',
      client: 'AppDev Solutions',
      type: 'mobile',
      status: 'completed',
      assignedTo: 'Alex Chen',
      startDate: '2024-01-05',
      endDate: '2024-01-12',
      priority: 'critical',
      progress: 100
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'audits', label: 'Audit Management', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'in-progress':
      case 'pending':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'inactive':
      case 'failed':
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
      case 'suspended':
        return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      case 'high':
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30';
      case 'medium':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web': return Globe;
      case 'network': return Server;
      case 'mobile': return Smartphone;
      case 'cloud': return Database;
      default: return Shield;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark transition-all duration-500">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
              Manage users, audits, and system settings
            </p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus className="w-5 h-5" />
              Add User
            </motion.button>
            <motion.button
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              Export Data
            </motion.button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-2 border border-white/20 dark:border-gray-700/30"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -4 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          stat.trend === 'up' ? 'text-green-600 bg-green-100 dark:bg-green-900/30' : 'text-red-600 bg-red-100 dark:bg-red-900/30'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Charts and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Activity Chart */}
                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">System Activity</h3>
                  <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Activity chart would be rendered here</p>
                    </div>
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Alerts</h3>
                  <div className="space-y-4">
                    {[
                      { type: 'warning', message: 'High CPU usage detected on server-01', time: '5 min ago' },
                      { type: 'success', message: 'Security audit completed for TechCorp', time: '1 hour ago' },
                      { type: 'error', message: 'Failed login attempts from suspicious IP', time: '2 hours ago' },
                      { type: 'info', message: 'New user registration: jane@example.com', time: '3 hours ago' }
                    ].map((alert, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-700/30 hover:bg-gray-50/70 dark:hover:bg-gray-700/50 transition-colors duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`p-1 rounded-full ${
                          alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          alert.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                          alert.type === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {alert.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                          {alert.type === 'success' && <CheckCircle className="w-4 h-4" />}
                          {alert.type === 'error' && <AlertTriangle className="w-4 h-4" />}
                          {alert.type === 'info' && <Activity className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">{alert.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="all">All Users</option>
                  <option value="admin">Admins</option>
                  <option value="user">Users</option>
                  <option value="tester">Testers</option>
                </select>
              </div>

              {/* Users Table */}
              <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">User</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">Role</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">Last Login</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">Audits</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                      {users.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          className="hover:bg-gray-50/30 dark:hover:bg-gray-700/30 transition-colors duration-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                              user.role === 'admin' ? 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' :
                              user.role === 'tester' ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' :
                              'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {user.lastLogin}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            {user.auditsCount}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <motion.button
                                className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Audit Management Tab */}
          {activeTab === 'audits' && (
            <div className="space-y-6">
              {/* Audit Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {audits.map((audit, index) => {
                  const TypeIcon = getTypeIcon(audit.type);
                  return (
                    <motion.div
                      key={audit.id}
                      className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -4 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            <TypeIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{audit.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{audit.client}</p>
                          </div>
                        </div>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(audit.status)}`}>
                            {audit.status.replace('-', ' ')}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Priority</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(audit.priority)}`}>
                            {audit.priority}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Assigned to</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{audit.assignedTo}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Start Date</span>
                          <span className="text-sm text-gray-900 dark:text-white">{audit.startDate}</span>
                        </div>

                        {audit.progress > 0 && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{audit.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${audit.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Audit Types Distribution</h3>
                  <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Pie chart would be rendered here</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Monthly Revenue</h3>
                  <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Revenue chart would be rendered here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">System Configuration</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Maintenance Mode', description: 'Enable system maintenance mode', enabled: false },
                      { label: 'Auto Backups', description: 'Automatic daily system backups', enabled: true },
                      { label: 'Email Notifications', description: 'System-wide email notifications', enabled: true },
                      { label: 'Debug Mode', description: 'Enable debug logging', enabled: false }
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50/30 dark:bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{setting.label}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50/30 dark:bg-gray-700/30 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        defaultValue={30}
                        className="w-full p-3 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div className="p-4 bg-gray-50/30 dark:bg-gray-700/30 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        defaultValue={5}
                        className="w-full p-3 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;