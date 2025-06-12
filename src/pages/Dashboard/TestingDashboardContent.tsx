import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Play,
  Pause,
  RotateCcw,
  Search,
  Filter,
  Calendar,
  Target,
  Activity,
  TrendingUp,
  Users,
  Globe,
  Smartphone,
  Server,
  Cloud,
  Plus,
  Upload,
  Save
} from 'lucide-react';
import { useWorkflow } from '../../context/WorkflowContext';

const TestingDashboardContent: React.FC = () => {
  const { 
    currentUser,
    getTesterRequests, 
    updateAuditStatus, 
    addFinding, 
    updateProgress, 
    uploadDocument, 
    generateReport 
  } = useWorkflow();
  
  const [assignedAudits, setAssignedAudits] = useState(getTesterRequests('tester-1'));
  const [filteredAudits, setFilteredAudits] = useState(assignedAudits);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [showFindingModal, setShowFindingModal] = useState(false);
  const [newFinding, setNewFinding] = useState({
    title: '',
    severity: 'medium' as const,
    description: '',
    impact: '',
    recommendation: ''
  });

  useEffect(() => {
    const testerAudits = getTesterRequests('tester-1');
    setAssignedAudits(testerAudits);
    setFilteredAudits(testerAudits);
  }, [getTesterRequests]);

  useEffect(() => {
    let filtered = assignedAudits;

    if (searchQuery) {
      filtered = filtered.filter(audit =>
        audit.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.auditType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(audit => audit.status === statusFilter);
    }

    setFilteredAudits(filtered);
  }, [searchQuery, statusFilter, assignedAudits]);

  const handleStatusUpdate = (auditId: string, newStatus: any) => {
    let updates: any = {};
    
    switch (newStatus) {
      case 'in-progress':
        updates = { 
          progress: 25, 
          testingPhase: 'Information Gathering' 
        };
        break;
      case 'testing':
        updates = { 
          progress: 50, 
          testingPhase: 'Active Testing' 
        };
        break;
      case 'reporting':
        updates = { 
          progress: 85, 
          testingPhase: 'Report Generation' 
        };
        break;
      case 'completed':
        updates = { 
          progress: 100, 
          testingPhase: 'Completed' 
        };
        generateReport(auditId);
        break;
    }
    
    updateAuditStatus(auditId, newStatus, updates);
    
    // Refresh the local state
    const updatedAudits = getTesterRequests('tester-1');
    setAssignedAudits(updatedAudits);
  };

  const handleAddFinding = () => {
    if (selectedAudit && newFinding.title && newFinding.description) {
      addFinding(selectedAudit.id, newFinding);
      setNewFinding({
        title: '',
        severity: 'medium',
        description: '',
        impact: '',
        recommendation: ''
      });
      setShowFindingModal(false);
      
      // Refresh the local state
      const updatedAudits = getTesterRequests('tester-1');
      setAssignedAudits(updatedAudits);
    }
  };

  const handleProgressUpdate = (auditId: string, progress: number, phase: string) => {
    updateProgress(auditId, progress, phase);
    
    // Refresh the local state
    const updatedAudits = getTesterRequests('tester-1');
    setAssignedAudits(updatedAudits);
  };

  const handleDocumentUpload = (auditId: string) => {
    const document = {
      name: 'Evidence Screenshot.png',
      type: 'PNG',
      size: '1.2 MB',
      category: 'evidence' as const,
      downloadUrl: `/evidence/${auditId}/screenshot.png`,
      status: 'ready' as const
    };
    
    uploadDocument(auditId, document);
    
    // Refresh the local state
    const updatedAudits = getTesterRequests('tester-1');
    setAssignedAudits(updatedAudits);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'testing': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
      case 'reporting': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'completed': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
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

  const getAuditTypeIcon = (type: string) => {
    switch (type) {
      case 'web': return Globe;
      case 'mobile': return Smartphone;
      case 'network': return Server;
      case 'cloud': return Cloud;
      default: return Shield;
    }
  };

  const stats = [
    {
      label: 'Assigned Audits',
      value: assignedAudits.length.toString(),
      icon: FileText,
      color: 'info',
      change: '+3 this week'
    },
    {
      label: 'In Progress',
      value: assignedAudits.filter(a => ['in-progress', 'testing'].includes(a.status)).length.toString(),
      icon: Activity,
      color: 'warning',
      change: 'Active testing'
    },
    {
      label: 'Completed',
      value: assignedAudits.filter(a => a.status === 'completed').length.toString(),
      icon: CheckCircle,
      color: 'success',
      change: '+2 this month'
    },
    {
      label: 'Critical Issues',
      value: assignedAudits.reduce((sum, audit) => sum + audit.vulnerabilities.critical, 0).toString(),
      icon: AlertTriangle,
      color: 'error',
      change: 'Needs attention'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Testing Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your assigned security audits and testing tasks</p>
        </div>
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
                  <p className="text-sm text-blue-600 dark:text-blue-400">{stat.change}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filters and Search */}
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
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
            <option value="testing">Testing</option>
            <option value="reporting">Reporting</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </motion.div>

      {/* Assigned Audits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAudits.map((audit, index) => {
          const TypeIcon = getAuditTypeIcon(audit.auditType);
          return (
            <motion.div
              key={audit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400">
                    <TypeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{audit.companyName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{audit.auditType} Audit</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(audit.priority)}`}>
                    {audit.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(audit.status)}`}>
                    {audit.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Target className="w-4 h-4" />
                  <span>{audit.targetUrl}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Assigned: {new Date(audit.submittedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Activity className="w-4 h-4" />
                  <span>Phase: {audit.testingPhase}</span>
                </div>
              </div>

              {audit.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Progress</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{audit.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${audit.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {audit.vulnerabilities.total > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Vulnerabilities Found</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { label: 'Critical', count: audit.vulnerabilities.critical, color: 'text-red-600' },
                      { label: 'High', count: audit.vulnerabilities.high, color: 'text-orange-600' },
                      { label: 'Medium', count: audit.vulnerabilities.medium, color: 'text-yellow-600' },
                      { label: 'Low', count: audit.vulnerabilities.low, color: 'text-green-600' },
                      { label: 'Info', count: audit.vulnerabilities.informational, color: 'text-blue-600' }
                    ].map((vuln, i) => (
                      <div key={i} className="text-center">
                        <div className={`text-lg font-bold ${vuln.color}`}>{vuln.count}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{vuln.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mb-4">
                {audit.status === 'assigned' && (
                  <button
                    onClick={() => handleStatusUpdate(audit.id, 'in-progress')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Start Audit
                  </button>
                )}
                {audit.status === 'in-progress' && (
                  <button
                    onClick={() => handleStatusUpdate(audit.id, 'testing')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                  >
                    <Activity className="w-4 h-4" />
                    Begin Testing
                  </button>
                )}
                {audit.status === 'testing' && (
                  <button
                    onClick={() => handleStatusUpdate(audit.id, 'reporting')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Generate Report
                  </button>
                )}
                {audit.status === 'reporting' && (
                  <button
                    onClick={() => handleStatusUpdate(audit.id, 'completed')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Complete Audit
                  </button>
                )}
                {audit.status === 'completed' && (
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg cursor-not-allowed">
                    <CheckCircle className="w-4 h-4" />
                    Completed
                  </button>
                )}
              </div>

              {['in-progress', 'testing'].includes(audit.status) && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedAudit(audit);
                      setShowFindingModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Finding
                  </button>
                  <button
                    onClick={() => handleDocumentUpload(audit.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {filteredAudits.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No audits assigned</h3>
          <p className="text-gray-600 dark:text-gray-400">Wait for admin to assign audits to you</p>
        </motion.div>
      )}

      {/* Add Finding Modal */}
      {showFindingModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowFindingModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Security Finding</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Finding Title
                </label>
                <input
                  type="text"
                  value={newFinding.title}
                  onChange={(e) => setNewFinding({...newFinding, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., SQL Injection in Login Form"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Severity
                </label>
                <select
                  value={newFinding.severity}
                  onChange={(e) => setNewFinding({...newFinding, severity: e.target.value as any})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="informational">Informational</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newFinding.description}
                  onChange={(e) => setNewFinding({...newFinding, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  placeholder="Describe the vulnerability..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Impact
                </label>
                <textarea
                  value={newFinding.impact}
                  onChange={(e) => setNewFinding({...newFinding, impact: e.target.value})}
                  rows={2}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  placeholder="What could happen if exploited..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recommendation
                </label>
                <textarea
                  value={newFinding.recommendation}
                  onChange={(e) => setNewFinding({...newFinding, recommendation: e.target.value})}
                  rows={2}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  placeholder="How to fix this issue..."
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowFindingModal(false)}
                className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFinding}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Add Finding
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default TestingDashboardContent;