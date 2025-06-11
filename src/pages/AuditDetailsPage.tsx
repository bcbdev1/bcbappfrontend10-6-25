import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  Calendar,
  User,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  Eye,
  FileText,
  BarChart3,
  Target,
  Globe,
  Server,
  Smartphone,
  Database,
  Bug,
  TrendingUp,
  Activity,
  Settings,
  Share2,
  Bookmark,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Info,
  XCircle
} from 'lucide-react';

interface AuditDetails {
  id: string;
  name: string;
  client: string;
  type: 'web' | 'network' | 'mobile' | 'cloud';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate?: string;
  assignedTo: string;
  progress: number;
  description: string;
  scope: string[];
  methodology: string;
  testingPeriod: string;
  reportDelivery: string;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    informational: number;
    total: number;
  };
  findings: Array<{
    id: string;
    title: string;
    severity: 'critical' | 'high' | 'medium' | 'low' | 'informational';
    status: 'open' | 'in-progress' | 'resolved' | 'false-positive';
    description: string;
    impact: string;
    recommendation: string;
    cvss: number;
    category: string;
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    category: 'report' | 'evidence' | 'documentation' | 'certificate';
  }>;
  timeline: Array<{
    id: string;
    event: string;
    date: string;
    description: string;
    type: 'milestone' | 'finding' | 'update' | 'completion';
  }>;
}

const AuditDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);

  // Mock data - in real app, this would be fetched based on the ID
  const auditDetails: AuditDetails = {
    id: id || '1',
    name: 'E-commerce Platform Security Audit',
    client: 'TechCorp Inc.',
    type: 'web',
    status: 'completed',
    priority: 'high',
    startDate: '2024-01-10',
    endDate: '2024-01-25',
    assignedTo: 'Alex Chen',
    progress: 100,
    description: 'Comprehensive security assessment of the e-commerce platform including web application testing, API security review, and infrastructure analysis.',
    scope: [
      'Web Application Security Testing',
      'API Security Assessment',
      'Authentication & Authorization Review',
      'Data Protection Analysis',
      'Infrastructure Security Review'
    ],
    methodology: 'OWASP Testing Guide v4.2',
    testingPeriod: 'Jan 10 - Jan 25, 2024',
    reportDelivery: 'Jan 30, 2024',
    vulnerabilities: {
      critical: 2,
      high: 5,
      medium: 8,
      low: 12,
      informational: 3,
      total: 30
    },
    findings: [
      {
        id: '1',
        title: 'SQL Injection in User Authentication',
        severity: 'critical',
        status: 'open',
        description: 'The login form is vulnerable to SQL injection attacks, allowing attackers to bypass authentication mechanisms.',
        impact: 'Complete authentication bypass, potential data breach, unauthorized access to sensitive customer information.',
        recommendation: 'Implement parameterized queries, input validation, and prepared statements. Consider using an ORM framework.',
        cvss: 9.8,
        category: 'Injection'
      },
      {
        id: '2',
        title: 'Cross-Site Scripting (XSS) in Product Reviews',
        severity: 'high',
        status: 'in-progress',
        description: 'Stored XSS vulnerability in the product review section allows execution of malicious scripts.',
        impact: 'Session hijacking, data theft, malicious redirects, defacement of the website.',
        recommendation: 'Implement proper output encoding, Content Security Policy (CSP), and input sanitization.',
        cvss: 7.2,
        category: 'Cross-Site Scripting'
      },
      {
        id: '3',
        title: 'Insecure Direct Object References',
        severity: 'medium',
        status: 'resolved',
        description: 'User profile endpoints allow access to other users\' data by manipulating object references.',
        impact: 'Unauthorized access to user profiles and personal information.',
        recommendation: 'Implement proper access controls and authorization checks for all object references.',
        cvss: 5.4,
        category: 'Broken Access Control'
      }
    ],
    documents: [
      {
        id: '1',
        name: 'Executive Summary Report',
        type: 'PDF',
        size: '2.4 MB',
        uploadDate: '2024-01-30',
        category: 'report'
      },
      {
        id: '2',
        name: 'Technical Vulnerability Report',
        type: 'PDF',
        size: '8.7 MB',
        uploadDate: '2024-01-30',
        category: 'report'
      },
      {
        id: '3',
        name: 'SQL Injection Evidence',
        type: 'PNG',
        size: '1.2 MB',
        uploadDate: '2024-01-15',
        category: 'evidence'
      },
      {
        id: '4',
        name: 'Remediation Guidelines',
        type: 'DOCX',
        size: '856 KB',
        uploadDate: '2024-01-30',
        category: 'documentation'
      }
    ],
    timeline: [
      {
        id: '1',
        event: 'Audit Initiated',
        date: '2024-01-10',
        description: 'Security audit project started with initial reconnaissance',
        type: 'milestone'
      },
      {
        id: '2',
        event: 'Critical Vulnerability Found',
        date: '2024-01-12',
        description: 'SQL injection vulnerability discovered in authentication system',
        type: 'finding'
      },
      {
        id: '3',
        event: 'Testing Phase Completed',
        date: '2024-01-20',
        description: 'All planned security tests have been executed',
        type: 'milestone'
      },
      {
        id: '4',
        event: 'Report Generated',
        date: '2024-01-25',
        description: 'Final security assessment report has been generated',
        type: 'completion'
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'findings', label: 'Findings', icon: Bug },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: Clock }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'resolved':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'in-progress':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'pending':
      case 'open':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'failed':
      case 'false-positive':
        return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'high':
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800';
      case 'medium':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
      case 'low':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case 'informational':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800';
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

  const getDocumentIcon = (category: string) => {
    switch (category) {
      case 'report': return FileText;
      case 'evidence': return Eye;
      case 'documentation': return Info;
      case 'certificate': return CheckCircle;
      default: return FileText;
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'milestone': return Target;
      case 'finding': return Bug;
      case 'update': return Activity;
      case 'completion': return CheckCircle;
      default: return Clock;
    }
  };

  const TypeIcon = getTypeIcon(auditDetails.type);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark transition-all duration-500">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="p-3 rounded-xl bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light bg-clip-text text-transparent">
              {auditDetails.name}
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mt-1">
              {auditDetails.client} • {auditDetails.methodology}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </motion.div>

        {/* Audit Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <TypeIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Audit Type</p>
                <p className="font-semibold text-gray-900 dark:text-white capitalize">{auditDetails.type}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(auditDetails.status)}`}>
                  {auditDetails.status}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                <Bug className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Vulnerabilities</p>
                <p className="font-semibold text-gray-900 dark:text-white">{auditDetails.vulnerabilities.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                <p className="font-semibold text-gray-900 dark:text-white">{auditDetails.progress}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
                  transition={{ delay: 0.2 + index * 0.05 }}
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
          transition={{ delay: 0.3 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Audit Information */}
                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Audit Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Client</span>
                      <span className="font-medium text-gray-900 dark:text-white">{auditDetails.client}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Assigned To</span>
                      <span className="font-medium text-gray-900 dark:text-white">{auditDetails.assignedTo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Testing Period</span>
                      <span className="font-medium text-gray-900 dark:text-white">{auditDetails.testingPeriod}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Report Delivery</span>
                      <span className="font-medium text-gray-900 dark:text-white">{auditDetails.reportDelivery}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Priority</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getSeverityColor(auditDetails.priority)}`}>
                        {auditDetails.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vulnerability Summary */}
                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Vulnerability Summary</h3>
                  <div className="space-y-4">
                    {[
                      { severity: 'Critical', count: auditDetails.vulnerabilities.critical, color: 'bg-red-500' },
                      { severity: 'High', count: auditDetails.vulnerabilities.high, color: 'bg-orange-500' },
                      { severity: 'Medium', count: auditDetails.vulnerabilities.medium, color: 'bg-yellow-500' },
                      { severity: 'Low', count: auditDetails.vulnerabilities.low, color: 'bg-green-500' },
                      { severity: 'Informational', count: auditDetails.vulnerabilities.informational, color: 'bg-blue-500' }
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

              {/* Scope and Description */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Audit Scope</h3>
                  <ul className="space-y-2">
                    {auditDetails.scope.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{auditDetails.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Findings Tab */}
          {activeTab === 'findings' && (
            <div className="space-y-6">
              {auditDetails.findings.map((finding, index) => (
                <motion.div
                  key={finding.id}
                  className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="p-6 cursor-pointer hover:bg-white/5 dark:hover:bg-gray-700/20 transition-colors duration-200"
                    onClick={() => setExpandedFinding(expandedFinding === finding.id ? null : finding.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{finding.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(finding.severity)}`}>
                            {finding.severity.toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(finding.status)}`}>
                            {finding.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{finding.description}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                          <span>CVSS: {finding.cvss}</span>
                          <span>Category: {finding.category}</span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedFinding === finding.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>
                  </div>

                  {expandedFinding === finding.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200/50 dark:border-gray-700/50"
                    >
                      <div className="p-6 space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Impact</h4>
                          <p className="text-gray-600 dark:text-gray-400">{finding.impact}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Recommendation</h4>
                          <p className="text-gray-600 dark:text-gray-400">{finding.recommendation}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <motion.button
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Eye className="w-4 h-4" />
                            View Evidence
                          </motion.button>
                          <motion.button
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auditDetails.documents.map((document, index) => {
                const DocumentIcon = getDocumentIcon(document.category);
                return (
                  <motion.div
                    key={document.id}
                    className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <DocumentIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{document.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <span>{document.type}</span>
                          <span>{document.size}</span>
                          <span>{document.uploadDate}</span>
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
                );
              })}
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Audit Timeline</h3>
              <div className="space-y-6">
                {auditDetails.timeline.map((event, index) => {
                  const TimelineIcon = getTimelineIcon(event.type);
                  return (
                    <motion.div
                      key={event.id}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`p-3 rounded-xl ${
                        event.type === 'completion' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                        event.type === 'finding' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                        event.type === 'milestone' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                        'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
                      }`}>
                        <TimelineIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{event.event}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuditDetailsPage;