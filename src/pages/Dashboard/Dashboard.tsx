import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/DashboardLayout';
import StatsCard from '../../components/StatsCard';
import AuditCard from '../../components/AuditCard';
import DocumentCard from '../../components/DocumentCard';
import QuickActionCard from '../../components/QuickActionCard';
import AuditDetailsModal from '../../components/AuditDetailsModal';
import NewAuditFormModal from '../../components/NewAuditFormModal';
import { useTheme } from '../../context/ThemeContext';
import { Filter, Plus, BellRing } from 'lucide-react';
import { ColorKey } from '../../types/index';
import apiClient from '../../lib/api';

const Dashboard = () => {
  const { theme } = useTheme();
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [showAuditDetails, setShowAuditDetails] = useState(false);
  const [showNewAuditForm, setShowNewAuditForm] = useState(false);
  const [stats, setStats] = useState([]);
  const [audits, setAudits] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, auditsRes, documentsRes, notificationsRes] = await Promise.all([
        apiClient.get('/dashboard/stats'),
        apiClient.get('/audits'),
        apiClient.get('/documents'),
        apiClient.get('/notifications')
      ]);

      setStats(statsRes.data);
      setAudits(auditsRes.data);
      setDocuments(documentsRes.data);
      setNotifications(notificationsRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Fallback to empty arrays
      setStats([]);
      setAudits([]);
      setDocuments([]);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (color: string, variant?: string): string => {
    const validColor = color as ColorKey;

    const colorMap: Record<string, Record<string, string>> = {
      info: {
        bg: theme === 'dark' ? 'bg-info/20' : 'bg-sky-50',
        text: theme === 'dark' ? 'text-info' : 'text-sky-600',
        border: theme === 'dark' ? 'border-info/30' : 'border-sky-200'
      },
      success: {
        bg: theme === 'dark' ? 'bg-success-dark/20' : 'bg-emerald-50',
        text: theme === 'dark' ? 'text-success-dark' : 'text-emerald-600',
        border: theme === 'dark' ? 'border-success-dark/30' : 'border-emerald-200'
      },
      warning: {
        bg: theme === 'dark' ? 'bg-warning-dark/20' : 'bg-amber-50',
        text: theme === 'dark' ? 'text-warning-dark' : 'text-amber-600',
        border: theme === 'dark' ? 'border-warning-dark/30' : 'border-amber-200'
      },
      error: {
        bg: theme === 'dark' ? 'bg-error-dark/20' : 'bg-red-50',
        text: theme === 'dark' ? 'text-error-dark' : 'text-red-600',
        border: theme === 'dark' ? 'border-error-dark/30' : 'border-red-200'
      },
      secondary: {
        bg: theme === 'dark' ? 'bg-secondary-dark/20' : 'bg-blue-50',
        text: theme === 'dark' ? 'text-secondary-dark' : 'text-blue-600',
        border: theme === 'dark' ? 'border-secondary-dark/30' : 'border-blue-200'
      }
    };

    return (
      colorMap[validColor]?.[variant || 'bg'] ||
      colorMap.info[variant || 'bg']
    );
  };

  const handleDownload = (document: any) => {
    console.log(`Downloading ${document.name}`);
  };

  const handlePreview = (document: any) => {
    console.log(`Previewing ${document.name}`);
  };

  const handleAuditClick = (audit: any) => {
    setSelectedAudit(audit);
    setShowAuditDetails(true);
  };

  const quickActionsData = [
    { label: 'Web Scan', icon: 'Globe', color: 'info', description: 'Scan web applications' },
    { label: 'Port Scan', icon: 'Shield', color: 'success', description: 'Network port analysis' },
    { label: 'Mobile Check', icon: 'Smartphone', color: 'secondary', description: 'Mobile app security' },
    { label: 'Report', icon: 'FileText', color: 'warning', description: 'Generate reports' }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary-dark"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, Test User!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's an overview of your security audits and account
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat: any, index: any) => (
            <StatsCard
              key={index}
              {...stat}
              index={index}
              theme={theme}
              getColorClasses={getColorClasses}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Audits Section */}
          <div className="xl:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-4 lg:p-6 rounded-2xl border backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-surface-dark/80 to-surface-secondary-dark/50 border-surface-secondary-dark/30 shadow-dark-card'
                  : 'bg-surface-light/80 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg lg:text-xl font-semibold">Your Audits</h3>
                <div className="flex items-center space-x-2">
                  <button className={`p-2 rounded-lg transition-all duration-200 ${
                    theme === 'dark'
                      ? 'hover:bg-surface-secondary-dark/50 text-text-secondary-dark hover:text-text-dark'
                      : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
                  }`}>
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="text-secondary-dark hover:underline text-sm font-medium">
                    View All →
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {audits.length > 0 ? (
                  audits.map((audit: any) => (
                    <AuditCard
                      key={audit.id}
                      audit={audit}
                      onClick={() => handleAuditClick(audit)}
                      theme={theme}
                      getColorClasses={getColorClasses}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No audits found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Request your first audit to get started
                    </p>
                  </div>
                )}
              </div>
              <motion.button
                onClick={() => setShowNewAuditForm(true)}
                className={`w-full mt-4 p-3 border-2 border-dashed rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group ${
                  theme === 'dark'
                    ? 'border-secondary-dark/30 text-secondary-dark hover:bg-secondary-dark/10 hover:border-secondary-dark/50'
                    : 'border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
                <span className="font-medium">Request New Audit</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-4 lg:p-6 rounded-2xl border backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-surface-dark/80 to-surface-secondary-dark/50 border-surface-secondary-dark/30 shadow-dark-card'
                  : 'bg-surface-light/80 border-gray-200'
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">Documents</h3>
              <div className="space-y-3">
                {documents.length > 0 ? (
                  documents.map((doc: any) => (
                    <DocumentCard
                      key={doc.id}
                      doc={doc}
                      onPreview={() => handlePreview(doc)}
                      onDownload={() => handleDownload(doc)}
                      theme={theme}
                      getColorClasses={getColorClasses}
                    />
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">No documents available</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`p-4 lg:p-6 rounded-2xl border backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-surface-dark/80 to-surface-secondary-dark/50 border-surface-secondary-dark/30 shadow-dark-card'
                  : 'bg-surface-light/80 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">Notifications</h3>
                  <div className="flex items-center space-x-1">
                    <BellRing className="w-4 h-4 text-secondary-dark" />
                    <span className="text-xs bg-error-dark text-white px-2 py-0.5 rounded-full">
                      {notifications.filter((n: any) => n.unread).length}
                    </span>
                  </div>
                </div>
                <button className="text-secondary-dark hover:underline text-sm font-medium">
                  See All →
                </button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification: any) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg transition-colors ${
                        notification.unread
                          ? theme === 'dark'
                            ? 'bg-secondary-dark/10 border border-secondary-dark/20'
                            : 'bg-blue-50 border border-blue-200'
                          : theme === 'dark'
                            ? 'hover:bg-surface-secondary-dark/30'
                            : 'hover:bg-gray-50'
                      }`}
                    >
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {notification.description}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-500 mt-2 block">
                        {notification.time}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">No notifications</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`p-4 lg:p-6 rounded-2xl border backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-surface-dark/80 to-surface-secondary-dark/50 border-surface-secondary-dark/30 shadow-dark-card'
                  : 'bg-surface-light/80 border-gray-200'
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActionsData.map((action: any) => (
                  <QuickActionCard
                    key={action.label}
                    action={action}
                    theme={theme}
                    getColorClasses={getColorClasses}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Modals */}
        <AuditDetailsModal
          show={showAuditDetails}
          onClose={() => setShowAuditDetails(false)}
          audit={selectedAudit}
          theme={theme}
          getColorClasses={getColorClasses}
        />

        <NewAuditFormModal
          show={showNewAuditForm}
          onClose={() => setShowNewAuditForm(false)}
          theme={theme}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;