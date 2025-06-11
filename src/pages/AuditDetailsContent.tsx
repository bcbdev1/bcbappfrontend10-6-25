import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
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
  RefreshCw
} from 'lucide-react';

interface AuditDetails {
  id: string;
  companyName: string;
  auditType: string;
  targetUrl: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  testingPhase: string;
  methodology: string;
  scope: string[];
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
    description: string;
    impact: string;
    recommendation: string;
    status: 'open' | 'fixed' | 'accepted' | 'false-positive';
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    category: string;
  }>;
  timeline: Array<{
    id: string;
    phase: string;
    status: 'completed' | 'in-progress' | 'pending';
    startDate: string;
    endDate?: string;
    description: string;
  }>;
}

const AuditDetailsContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [auditDetails, setAuditDetails] = useState<AuditDetails | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockAuditDetails: AuditDetails = {
      id: id || '1',
      companyName: 'TechCorp Solutions',
      auditType: 'web',
      targetUrl: 'https://techcorp.com',
      status: 'in-progress',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      progress: 75,
      testingPhase: 'Vulnerability Assessment',
      methodology: 'OWASP Testing Guide',
      scope: ['Web Application', 'API Endpoints', 'Authentication System', 'Database Security'],
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
          title: 'SQL Injection in Login Form',
          severity: 'critical',
          description: 'The login form is vulnerable to SQL injection attacks through the username parameter.',
          impact: 'Attackers could gain unauthorized access to the database and extract sensitive information.',
          recommendation: 'Implement parameterized queries and input validation.',
          status: 'open'
        },
        {
          id: '2',
          title: 'Cross-Site Scripting (XSS)',
          severity: 'high',
          description: 'Reflected XSS vulnerability found in the search functionality.',
          impact: 'Attackers could execute malicious scripts in users\' browsers.',
          recommendation: 'Implement proper output encoding and Content Security Policy.',
          status: 'fixed'
        }
      ],
      documents: [
        {
          id: '1',
          name: 'Vulnerability Assessment Report',
          type: 'PDF',
          size: '2.4 MB',
          uploadDate: '2024-01-20',
          category: 'report'
        },
        {
          id: '2',
          name: 'Executive Summary',
          type: 'PDF',
          size: '856 KB',
          uploadDate: '2024-01-22',
          category: 'summary'
        }
      ],
      timeline: [
        {
          id: '1',
          phase: 'Planning & Scoping',
          status: 'completed',
          startDate: '2024-01-15',
          endDate: '2024-01-17',
          description: 'Define audit scope and methodology'
        },
        {
          id: '2',
          phase: 'Information Gathering',
          status: 'completed',
          startDate: '2024-01-18',
          endDate: '2024-01-22',
          description: 'Reconnaissance and asset discovery'
        },
        {
          id: '3',
          phase: 'Vulnerability Assessment',
          status: 'in-progress',
          startDate: '2024-01-23',
          description: 'Active testing and vulnerability identification'
        },
        {
          id: '4',
          phase: 'Exploitation & Validation',
          status: 'pending',
          startDate: '2024-02-01',
          description: 'Validate findings and assess impact'
        },
        {
          id: '5',
          phase: 'Reporting',
          status: 'pending',
          startDate: '2024-02-10',
          description: 'Generate comprehensive audit report'
        }
      ]
    };

    setTimeout(() => {
      setAuditDetails(mockAuditDetails);
      setLoading(false);
    }, 1000);
  }, [id]);

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
        </div>
      </div>
    );
  }

  const TypeIcon = getAuditTypeIcon(auditDetails.auditType);

  return (
    <div className="p-6 space-y-6">
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
                  <span>{new Date(auditDetails.startDate).toLocaleDateString()} - {new Date(auditDetails.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 capitalize">
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
                  <p className="text-gray-900 dark:text-white">{auditDetails.methodology}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Scope</label>
                  <div className="mt-1 space-y-1">
                    {auditDetails.scope.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900 dark:text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Phase</label>
                  <p className="text-gray-900 dark:text-white">{auditDetails.testingPhase}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'findings' && (
          <div className="space-y-4">
            {auditDetails.findings.map((finding) => (
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
            ))}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Audit Documents</h2>
            <div className="space-y-4">
              {auditDetails.documents.map((doc) => (
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
                    <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Audit Timeline</h2>
            <div className="space-y-6">
              {auditDetails.timeline.map((phase, index) => (
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
    </div>
  );
};

export default AuditDetailsContent;