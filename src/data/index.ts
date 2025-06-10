// src/data.ts

import {
  Shield,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  Info,
  AlertCircle,
  Globe,
  Smartphone,
  FileText
} from 'lucide-react';

import { ElementType } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  unread: boolean;
  icon: ElementType;
}

export const statsData = [
  {
    label: 'Active Audits',
    value: '2',
    icon: Shield,
    color: 'info',
    trend: '+12%',
    description: 'Currently running security audits'
  },
  {
    label: 'Completed Audits',
    value: '1',
    icon: CheckCircle,
    color: 'success',
    trend: '+25%',
    description: 'Successfully completed this month'
  },
  {
    label: 'Security Score',
    value: '82/100',
    icon: TrendingUp,
    color: 'warning',
    trend: '+5%',
    description: 'Overall security rating'
  },
  {
    label: 'Vulnerabilities',
    value: '3',
    icon: AlertTriangle,
    color: 'error',
    trend: '-15%',
    description: 'Critical issues found'
  }
];

export const recentAuditsData = [
  {
    id: 1,
    name: 'Network Audit',
    status: 'In Progress',
    progress: 65,
    date: '2025-05-10 - 2025-05-25',
    type: 'network',
    priority: 'high',
    testingPeriod: 'Sep 17 - Oct 16',
    reportDelivery: 'Oct 30, 2021',
    methodology: 'Network Security',
    vulnerabilities: {
      critical: 6,
      high: 6,
      medium: 0,
      low: 8,
      informational: 2,
      total: 22
    },
    testingProgress: 65
  },
  {
    id: 2,
    name: 'Web App Audit',
    status: 'Scheduled',
    progress: 0,
    date: '2025-05-20 - 2025-06-05',
    type: 'web',
    priority: 'medium',
    testingPeriod: 'May 20 - Jun 05',
    reportDelivery: 'Jun 15, 2025',
    methodology: 'Web Application',
    vulnerabilities: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      informational: 0,
      total: 0
    },
    testingProgress: 0
  },
  {
    id: 3,
    name: 'Cloud Audit',
    status: 'Completed',
    progress: 100,
    date: '2025-04-15 - 2025-04-30',
    type: 'cloud',
    priority: 'low',
    testingPeriod: 'Apr 15 - Apr 30',
    reportDelivery: 'May 10, 2025',
    methodology: 'Cloud Infrastructure',
    vulnerabilities: {
      critical: 2,
      high: 4,
      medium: 3,
      low: 5,
      informational: 1,
      total: 15
    },
    testingProgress: 100
  }
];

export const notificationsData: NotificationItem[] = [
  {
    id: 1,
    title: 'Network Audit Report Updated',
    description: 'Your network security audit report has been updated with new findings',
    time: '2 hours ago',
    type: 'info',
    unread: true,
    icon: Info
  },
  {
    id: 2,
    title: 'Critical Vulnerability Detected',
    description: 'High-severity vulnerability found in web application requiring immediate attention',
    time: '1 day ago',
    type: 'warning',
    unread: true,
    icon: AlertTriangle
  },
  {
    id: 3,
    title: 'Cloud Audit Completed',
    description: 'Your cloud infrastructure audit has been completed successfully with no critical issues',
    time: '3 days ago',
    type: 'success',
    unread: false,
    icon: CheckCircle
  },
  {
    id: 4,
    title: 'Security Certificate Expiring',
    description: 'Your SSL certificate will expire in 30 days. Renewal recommended',
    time: '5 days ago',
    type: 'warning',
    unread: false,
    icon: AlertCircle
  }
];

export const quickActionsData = [
  { label: 'Web Scan', icon: Globe, color: 'info', description: 'Scan web applications' },
  { label: 'Port Scan', icon: Shield, color: 'success', description: 'Network port analysis' },
  { label: 'Mobile Check', icon: Smartphone, color: 'secondary', description: 'Mobile app security' },
  { label: 'Report', icon: FileText, color: 'warning', description: 'Generate reports' }
];

export const documentsData = [
  {
    id: 1,
    name: 'Network Security Audit Report',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: '2025-01-15',
    uploadTime: '14:30',
    status: 'completed',
    category: 'audit-report'
  },
  {
    id: 2,
    name: 'Vulnerability Assessment Summary',
    type: 'PDF',
    size: '1.8 MB',
    uploadDate: '2025-01-14',
    uploadTime: '09:15',
    status: 'completed',
    category: 'vulnerability'
  },
  {
    id: 3,
    name: 'Compliance Certificate',
    type: 'PDF',
    size: '856 KB',
    uploadDate: '2025-01-12',
    uploadTime: '16:45',
    status: 'completed',
    category: 'certificate'
  },
  {
    id: 4,
    name: 'Security Policy Document',
    type: 'PDF',
    size: '3.2 MB',
    uploadDate: '2025-01-10',
    uploadTime: '11:20',
    status: 'processing',
    category: 'policy'
  }
];