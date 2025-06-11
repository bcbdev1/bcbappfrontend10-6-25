import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Target,
  Bug,
  CheckCircle,
  Clock,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  User,
  Globe,
  Server,
  Smartphone,
  Database,
  Wifi,
  Code,
  Terminal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Settings
} from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  type: 'manual' | 'automated';
  category: 'web' | 'network' | 'mobile' | 'api';
  status: 'pending' | 'running' | 'passed' | 'failed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  estimatedTime: string;
  actualTime?: string;
  lastRun?: string;
  description: string;
}

interface Vulnerability {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'false-positive';
  category: string;
  discoveredDate: string;
  assignedTo: string;
  description: string;
  steps: string[];
  impact: string;
  recommendation: string;
}

const TestingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);

  // Mock data
  const stats = [
    {
      label: 'Active Tests',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: Play,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Vulnerabilities Found',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Bug,
      color: 'from-red-500 to-pink-500'
    },
    {
      label: 'Tests Passed',
      value: '156',
      change: '+8',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Coverage',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Target,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const testCases: TestCase[] = [
    {
      id: '1',
      name: 'SQL Injection Test - Login Form',
      type: 'manual',
      category: 'web',
      status: 'running',
      priority: 'high',
      assignedTo: 'Alex Chen',
      estimatedTime: '2 hours',
      actualTime: '1.5 hours',
      lastRun: '2024-01-15 14:30',
      description: 'Test login form for SQL injection vulnerabilities using various payloads'
    },
    {
      id: '2',
      name: 'XSS Vulnerability Scan',
      type: 'automated',
      category: 'web',
      status: 'passed',
      priority: 'medium',
      assignedTo: 'Sarah Wilson',
      estimatedTime: '30 minutes',
      actualTime: '25 minutes',
      lastRun: '2024-01-15 12:15',
      description: 'Automated scan for cross-site scripting vulnerabilities across all input fields'
    },
    {
      id: '3',
      name: 'Network Port Scan',
      type: 'automated',
      category: 'network',
      status: 'failed',
      priority: 'critical',
      assignedTo: 'Mike Johnson',
      estimatedTime: '1 hour',
      lastRun: '2024-01-15 10:00',
      description: 'Comprehensive port scan to identify open services and potential entry points'
    }
  ];

  const vulnerabilities: Vulnerability[] = [
    {
      id: '1',
      title: 'SQL Injection in User Authentication',
      severity: 'critical',
      status: 'open',
      category: 'Web Application',
      discoveredDate: '2024-01-15',
      assignedTo: 'Alex Chen',
      description: 'The login form is vulnerable to SQL injection attacks, allowing attackers to bypass authentication.',
      steps: [
        'Navigate to login page',
        'Enter \' OR 1=1-- in username field',
        'Enter any password',
        'Click login button',
        'Observe successful authentication bypass'
      ],
      impact: 'Complete authentication bypass, potential data breach',
      recommendation: 'Implement parameterized queries and input validation'
    },
    {
      id: '2',
      title: 'Cross-Site Scripting (XSS) in Comment Section',
      severity: 'high',
      status: 'in-progress',
      category: 'Web Application',
      discoveredDate: '2024-01-14',
      assignedTo: 'Sarah Wilson',
      description: 'Stored XSS vulnerability in the comment section allows execution of malicious scripts.',
      steps: [
        'Navigate to comment section',
        'Submit comment with <script>alert("XSS")</script>',
        'Reload page',
        'Observe script execution'
      ],
      impact: 'Session hijacking, data theft, malicious redirects',
      recommendation: 'Implement proper output encoding and Content Security Policy'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'test-cases', label: 'Test Cases', icon: FileText },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: Bug },
    { id: 'reports', label: 'Reports', icon: Download },
    { id: 'tools', label: 'Testing Tools', icon: Terminal }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
      case 'resolved':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'running':
      case 'in-progress':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'failed':
      case 'open':
        return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      case 'pending':
      case 'blocked':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'false-positive':
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return Globe;
      case 'network': return Server;
      case 'mobile': return Smartphone;
      case 'api': return Code;
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
              Testing Dashboard
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
              Manage security tests, track vulnerabilities, and generate reports
            </p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              New Test
            </motion.button>
            <motion.button
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5" />
              Run Suite
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
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
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

              {/* Recent Activity and Test Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Test Runs */}
                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Test Runs</h3>
                  <div className="space-y-4">
                    {testCases.slice(0, 5).map((test, index) => {
                      const CategoryIcon = getCategoryIcon(test.category);
                      return (
                        <motion.div
                          key={test.id}
                          className="flex items-center gap-4 p-4 bg-gray-50/30 dark:bg-gray-700/30 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{test.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                                {test.status}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{test.lastRun}</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Vulnerability Summary */}
                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Vulnerability Summary</h3>
                  <div className="space-y-4">
                    {[
                      { severity: 'Critical', count: 2, color: 'bg-red-500' },
                      { severity: 'High', count: 5, color: 'bg-orange-500' },
                      { severity: 'Medium', count: 8, color: 'bg-yellow-500' },
                      { severity: 'Low', count: 12, color: 'bg-green-500' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50/30 dark:bg-gray-700/30 rounded-xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${item.color}`} />
                          <span className="font-medium text-gray-900 dark:text-white">{item.severity}</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{item.count}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Test Cases Tab */}
          {activeTab === 'test-cases' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search test cases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="all">All Categories</option>
                  <option value="web">Web Application</option>
                  <option value="network">Network</option>
                  <option value="mobile">Mobile</option>
                  <option value="api">API</option>
                </select>
              </div>

              {/* Test Cases Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {testCases.map((testCase, index) => {
                  const CategoryIcon = getCategoryIcon(testCase.category);
                  return (
                    <motion.div
                      key={testCase.id}
                      className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.02, y: -4 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedTestCase(testCase)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              testCase.type === 'automated' ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' : 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
                            }`}>
                              {testCase.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button
                            className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Play className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{testCase.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{testCase.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(testCase.status)}`}>
                            {testCase.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Priority</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(testCase.priority)}`}>
                            {testCase.priority}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Assigned to</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{testCase.assignedTo}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Vulnerabilities Tab */}
          {activeTab === 'vulnerabilities' && (
            <div className="space-y-6">
              {/* Vulnerabilities List */}
              <div className="space-y-4">
                {vulnerabilities.map((vulnerability, index) => (
                  <motion.div
                    key={vulnerability.id}
                    className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.01, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedVulnerability(vulnerability)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{vulnerability.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(vulnerability.severity)}`}>
                            {vulnerability.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{vulnerability.description}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                          <span>Category: {vulnerability.category}</span>
                          <span>Discovered: {vulnerability.discoveredDate}</span>
                          <span>Assigned to: {vulnerability.assignedTo}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vulnerability.status)}`}>
                          {vulnerability.status.replace('-', ' ')}
                        </span>
                        <motion.button
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Executive Summary Report', type: 'PDF', size: '2.4 MB', date: '2024-01-15', icon: FileText },
                  { name: 'Technical Vulnerability Report', type: 'PDF', size: '5.8 MB', date: '2024-01-15', icon: Bug },
                  { name: 'Test Case Results', type: 'Excel', size: '1.2 MB', date: '2024-01-14', icon: CheckCircle },
                  { name: 'Compliance Report', type: 'PDF', size: '3.1 MB', date: '2024-01-13', icon: Shield },
                  { name: 'Risk Assessment', type: 'PDF', size: '2.7 MB', date: '2024-01-12', icon: AlertTriangle },
                  { name: 'Remediation Plan', type: 'Word', size: '1.8 MB', date: '2024-01-11', icon: Target }
                ].map((report, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <report.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{report.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <span>{report.type}</span>
                          <span>{report.size}</span>
                          <span>{report.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </motion.button>
                          <motion.button
                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Eye className="w-4 h-4" />
                            Preview
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Testing Tools Tab */}
          {activeTab === 'tools' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'OWASP ZAP', description: 'Web application security scanner', status: 'Available', icon: Globe },
                  { name: 'Nmap', description: 'Network discovery and security auditing', status: 'Available', icon: Server },
                  { name: 'Burp Suite', description: 'Web vulnerability scanner', status: 'Available', icon: Shield },
                  { name: 'Metasploit', description: 'Penetration testing framework', status: 'Available', icon: Terminal },
                  { name: 'Wireshark', description: 'Network protocol analyzer', status: 'Available', icon: Wifi },
                  { name: 'SQLMap', description: 'SQL injection testing tool', status: 'Available', icon: Database }
                ].map((tool, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                        <tool.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tool.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30">
                            {tool.status}
                          </span>
                          <motion.button
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Launch
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TestingDashboard;