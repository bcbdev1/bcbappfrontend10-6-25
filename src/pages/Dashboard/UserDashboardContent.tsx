import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Plus,
  Eye,
  Download,
  RefreshCw,
  Calendar,
  Target,
  Activity,
  FileText,
  Filter,
  Search
} from 'lucide-react';
import { useWorkflow } from '../../context/WorkflowContext';
import { useTheme } from '../../context/ThemeContext';

const UserDashboardContent: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { 
    currentUser, 
    getUserRequests, 
    requestReaudit,
    updateAuditStatus 
  } = useWorkflow();
  
  const [userRequests, setUserRequests] = useState(getUserRequests(currentUser.id));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    setUserRequests(getUserRequests(currentUser.id));
  }, [currentUser.id, getUserRequests]);

  const filteredRequests = userRequests.filter(request => {
    const matchesSearch = request.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.auditType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: 'Total Audits',
      value: userRequests.length.toString(),
      icon: Shield,
      color: 'info',
      trend: '+2 this month',
      description: 'All audit requests'
    },
    {
      label: 'Active Audits',
      value: userRequests.filter(r => ['assigned', 'in-progress', 'testing'].includes(r.status)).length.toString(),
      icon: Activity,
      color: 'warning',
      trend: 'In progress',
      description: 'Currently being tested'
    },
    {
      label: 'Completed',
      value: userRequests.filter(r => r.status === 'completed').length.toString(),
      icon: CheckCircle,
      color: 'success',
      trend: '+1 this week',
      description: 'Successfully completed'
    },
    {
      label: 'Critical Issues',
      value: userRequests.reduce((sum, r) => sum + r.vulnerabilities.critical, 0).toString(),
      icon: AlertTriangle,
      color: 'error',
      trend: 'Needs attention',
      description: 'High priority vulnerabilities'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'approved': 
      case 'assigned': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'in-progress': 
      case 'testing': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
      case 'reporting': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'completed': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'rejected': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'high': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'low': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const handleViewDetails = (request: any) => {
    navigate(`/audit/${request.id}`);
  };

  const handleDownloadReport = (request: any) => {
    if (request.reportUrl) {
      // In a real app, this would trigger an actual download
      alert(`Downloading report for ${request.companyName}`);
    }
  };

  const handleRequestReaudit = (request: any) => {
    const updates = {
      description: `Re-audit requested for ${request.companyName} - Follow-up security assessment`,
      additionalRequirements: 'Follow-up audit to verify fixes and identify new vulnerabilities'
    };
    requestReaudit(request.id, updates);
    alert('Re-audit request submitted successfully!');
  };

  const getColorClasses = (color: string, variant: string = 'bg') => {
    const colorMap: Record<string, Record<string, string>> = {
      info: {
        bg: theme === 'dark' ? 'bg-blue-500/20' : 'bg-sky-50',
        text: theme === 'dark' ? 'text-blue-400' : 'text-sky-600',
        border: theme === 'dark' ? 'border-blue-500/30' : 'border-sky-200'
      },
      success: {
        bg: theme === 'dark' ? 'bg-green-500/20' : 'bg-emerald-50',
        text: theme === 'dark' ? 'text-green-400' : 'text-emerald-600',
        border: theme === 'dark' ? 'border-green-500/30' : 'border-emerald-200'
      },
      warning: {
        bg: theme === 'dark' ? 'bg-yellow-500/20' : 'bg-amber-50',
        text: theme === 'dark' ? 'text-yellow-400' : 'text-amber-600',
        border: theme === 'dark' ? 'border-yellow-500/30' : 'border-amber-200'
      },
      error: {
        bg: theme === 'dark' ? 'bg-red-500/20' : 'bg-red-50',
        text: theme === 'dark' ? 'text-red-400' : 'text-red-600',
        border: theme === 'dark' ? 'border-red-500/30' : 'border-red-200'
      }
    };

    return colorMap[color]?.[variant] || colorMap.info[variant];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Security Audits</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your security audit requests and view results</p>
        </div>
        <motion.button
          onClick={() => navigate('/get-started')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          Request New Audit
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{stat.trend}</p>
                </div>
                <div className={`p-3 rounded-xl ${getColorClasses(stat.color, 'bg')} ${getColorClasses(stat.color, 'text')}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search audits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
            <option value="testing">Testing</option>
            <option value="reporting">Reporting</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </motion.div>

      {/* Audit Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{request.companyName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{request.auditType} Security Audit</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(request.priority)}`}>
                  {request.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
                  {request.status.replace('-', ' ')}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Target className="w-4 h-4" />
                <span>{request.targetUrl}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Submitted: {new Date(request.submittedAt).toLocaleDateString()}</span>
              </div>
              {request.assignedTester && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Activity className="w-4 h-4" />
                  <span>Assigned to: {request.assignedTester}</span>
                </div>
              )}
            </div>

            {request.progress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Progress</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{request.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${request.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Phase: {request.testingPhase}</p>
              </div>
            )}

            {request.vulnerabilities.total > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Vulnerabilities Found</h4>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: 'Critical', count: request.vulnerabilities.critical, color: 'text-red-600' },
                    { label: 'High', count: request.vulnerabilities.high, color: 'text-orange-600' },
                    { label: 'Medium', count: request.vulnerabilities.medium, color: 'text-yellow-600' },
                    { label: 'Low', count: request.vulnerabilities.low, color: 'text-green-600' },
                    { label: 'Info', count: request.vulnerabilities.informational, color: 'text-blue-600' }
                  ].map((vuln, i) => (
                    <div key={i} className="text-center">
                      <div className={`text-lg font-bold ${vuln.color}`}>{vuln.count}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{vuln.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleViewDetails(request)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              
              {request.status === 'completed' && request.reportUrl && (
                <button
                  onClick={() => handleDownloadReport(request)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Report
                </button>
              )}
              
              {request.status === 'completed' && (
                <button
                  onClick={() => handleRequestReaudit(request)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Re-audit
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No audit requests found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Get started by requesting your first security audit</p>
          <motion.button
            onClick={() => navigate('/get-started')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            Request New Audit
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default UserDashboardContent;