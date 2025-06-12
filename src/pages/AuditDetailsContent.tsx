import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Shield,
  Calendar,
  Target,
  FileText,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  TrendingUp,
  Users,
  Globe,
  Server,
  Database,
  Lock,
  Wifi,
  Smartphone,
  Cloud,
  BarChart3,
  PieChart,
  LineChart,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';

const AuditDetailsContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { auditRequests, requestReaudit } = useWorkflow();
  const [auditDetails, setAuditDetails] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const audit = auditRequests.find(a => a.id === id);
      if (audit) {
        setAuditDetails(audit);
      }
      setLoading(false);
    }
  }, [id, auditRequests]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'high': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'low': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'informational': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'fixed': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'accepted': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'false-positive': return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const getAuditTypeIcon = (type: string) => {
    switch (type) {
      case 'web': return Globe;
      case 'mobile': return Smartphone;
      case 'network': return Server;
      case 'cloud': return Cloud;
      case 'database': return Database;
      case 'wireless': return Wifi;
      default: return Shield;
    }
  };

  const handleDownload = (document: any) => {
    // In a real app, this would trigger an actual download
    alert(`Downloading ${document.name}`);
  };

  const handleReaudit = () => {
    if (auditDetails) {
      const updates = {
        description: `Re-audit requested for ${auditDetails.companyName} - Follow-up security assessment`,
        additionalRequirements: 'Follow-up audit to verify fixes and identify new vulnerabilities'
      };
      requestReaudit(auditDetails.id, updates);
      alert('Re-audit request submitted successfully!');
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!auditDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Audit Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The requested audit could not be found.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const TypeIcon = getAuditTypeIcon(auditDetails.auditType);

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400">
              <TypeIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{auditDetails.companyName}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 capitalize">{auditDetails.auditType} Security Audit</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Target className="w-4 h-4" />
                  <span>{auditDetails.targetUrl}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Submitted: {new Date(auditDetails.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
              auditDetails.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
              auditDetails.status === 'in-progress' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
              'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
            }`}>
              {auditDetails.status.replace('-', ' ')}
            </span>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Progress: {auditDetails.progress}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${auditDetails.progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Current Phase: {auditDetails.testingPhase}</span>
            <span>{auditDetails.progress}% Complete</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30"
      >
        <div className="flex overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'findings', label: 'Findings', icon: AlertTriangle },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'timeline', label: 'Timeline', icon: Clock }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vulnerability Summary */}
            <div className="lg:col-span-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Vulnerability Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'Critical', count: auditDetails.vulnerabilities.critical, color: 'bg-red-500' },
                  { label: 'High', count: auditDetails.vulnerabilities.high, color: 'bg-orange-500' },
                  { label: 'Medium', count: auditDetails.vulnerabilities.medium, color: 'bg-yellow-500' },
                  { label: 'Low', count: auditDetails.vulnerabilities.low, color: 'bg-green-500' },
                  { label: 'Info', count: auditDetails.vulnerabilities.informational, color: 'bg-blue-500' }
                ].map((vuln, index) => (
                  <div key={index} className="text-center">
                    <div className={`${vuln.color} text-white text-xs px-3 py-1 rounded-full mb-2`}>
                      {vuln.label}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{vuln.count}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{auditDetails.vulnerabilities.total}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Vulnerabilities</div>
              </div>
            </div>

            {/* Audit Information */}
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Audit Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Methodology</label>
                  <p className="text-gray-900 dark:text-white">{auditDetails.methodology || 'OWASP Testing Guide'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Priority</label>
                  <p className="text-gray-900 dark:text-white capitalize">{auditDetails.priority}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Phase</label>
                  <p className="text-gray-900 dark:text-white">{auditDetails.testingPhase}</p>
                </div>
                {auditDetails.assignedTester && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Assigned Tester</label>
                    <p className="text-gray-900 dark:text-white">{auditDetails.assignedTester}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'findings' && (
          <div className="space-y-4">
            {auditDetails.findings.length > 0 ? (
              auditDetails.findings.map((finding: any) => (
                <div key={finding.id} className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{finding.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(finding.severity)}`}>
                          {finding.severity}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(finding.status)}`}>
                          {finding.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                      <p className="text-gray-600 dark:text-gray-400">{finding.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Impact</h4>
                      <p className="text-gray-600 dark:text-gray-400">{finding.impact}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommendation</h4>
                      <p className="text-gray-600 dark:text-gray-400">{finding.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No findings yet</h3>
                <p className="text-gray-600 dark:text-gray-400">Findings will appear here as the audit progresses</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Audit Documents</h2>
            <div className="space-y-4">
              {auditDetails.documents.length > 0 ? (
                auditDetails.documents.map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200/50 dark:border-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{doc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDownload(doc)}
                        className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">Documents will be available as the audit progresses</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Audit Timeline</h2>
            <div className="space-y-6">
              {auditDetails.timeline.map((phase: any, index: number) => (
                <div key={phase.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      phase.status === 'completed' ? 'bg-green-500 text-white' :
                      phase.status === 'in-progress' ? 'bg-blue-500 text-white' :
                      'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      {phase.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : phase.status === 'in-progress' ? (
                        <Activity className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>
                    {index < auditDetails.timeline.length - 1 && (
                      <div className={`w-0.5 h-12 mt-2 ${
                        phase.status === 'completed' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{phase.phase}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{phase.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Started: {new Date(phase.startDate).toLocaleDateString()}
                      {phase.endDate && ` • Completed: ${new Date(phase.endDate).toLocaleDateString()}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-end space-x-4 pt-4"
      >
        {auditDetails.status === 'completed' && (
          <motion.button
            onClick={handleReaudit}
            className="px-6 py-2 bg-gradient-to-r from-secondary-dark to-accent-dark text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Request Re-audit</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default AuditDetailsContent;