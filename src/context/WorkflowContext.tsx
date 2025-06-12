import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuditRequest {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  auditType: 'web' | 'network' | 'mobile' | 'cloud' | 'wireless';
  targetUrl: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  methodology: string;
  estimatedDuration: string;
  budget: string;
  preferredStartDate: string;
  additionalRequirements: string;
  status: 'pending' | 'approved' | 'rejected' | 'assigned' | 'in-progress' | 'testing' | 'reporting' | 'completed';
  submittedAt: string;
  assignedTester?: string;
  testerId?: string;
  userId: string;
  progress: number;
  testingPhase: string;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    informational: number;
    total: number;
  };
  findings: Finding[];
  documents: Document[];
  timeline: TimelineEvent[];
  reportUrl?: string;
  completedAt?: string;
}

export interface Finding {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'informational';
  description: string;
  impact: string;
  recommendation: string;
  status: 'open' | 'fixed' | 'accepted' | 'false-positive';
  foundAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: 'report' | 'certificate' | 'evidence' | 'summary';
  downloadUrl: string;
  status: 'processing' | 'ready';
}

export interface TimelineEvent {
  id: string;
  phase: string;
  status: 'completed' | 'in-progress' | 'pending';
  startDate: string;
  endDate?: string;
  description: string;
  details?: string;
}

interface WorkflowContextType {
  auditRequests: AuditRequest[];
  currentUser: {
    id: string;
    role: 'user' | 'admin' | 'tester';
    name: string;
    email: string;
  };
  submitAuditRequest: (request: Omit<AuditRequest, 'id' | 'submittedAt' | 'status' | 'progress' | 'testingPhase' | 'vulnerabilities' | 'findings' | 'documents' | 'timeline'>) => void;
  approveRequest: (requestId: string, testerId: string) => void;
  rejectRequest: (requestId: string, reason: string) => void;
  updateAuditStatus: (requestId: string, status: AuditRequest['status'], updates?: Partial<AuditRequest>) => void;
  addFinding: (requestId: string, finding: Omit<Finding, 'id' | 'foundAt'>) => void;
  updateProgress: (requestId: string, progress: number, phase: string) => void;
  uploadDocument: (requestId: string, document: Omit<Document, 'id' | 'uploadDate'>) => void;
  generateReport: (requestId: string) => void;
  requestReaudit: (originalRequestId: string, updates: Partial<AuditRequest>) => void;
  getUserRequests: (userId: string) => AuditRequest[];
  getTesterRequests: (testerId: string) => AuditRequest[];
  getPendingRequests: () => AuditRequest[];
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};

interface WorkflowProviderProps {
  children: ReactNode;
}

export const WorkflowProvider: React.FC<WorkflowProviderProps> = ({ children }) => {
  const [auditRequests, setAuditRequests] = useState<AuditRequest[]>([]);
  
  // Mock current user - in real app, this would come from auth context
  const [currentUser] = useState({
    id: 'user-1',
    role: 'user' as const,
    name: 'Test User',
    email: 'test@example.com'
  });

  // Load initial data from localStorage
  useEffect(() => {
    const savedRequests = localStorage.getItem('auditRequests');
    if (savedRequests) {
      setAuditRequests(JSON.parse(savedRequests));
    } else {
      // Initialize with some sample data
      const initialRequests: AuditRequest[] = [
        {
          id: 'audit-1',
          companyName: 'TechCorp Solutions',
          contactName: 'John Smith',
          contactEmail: 'john@techcorp.com',
          contactPhone: '+1 (555) 123-4567',
          auditType: 'web',
          targetUrl: 'https://techcorp.com',
          description: 'Comprehensive web application security audit',
          priority: 'high',
          methodology: 'OWASP Testing Guide',
          estimatedDuration: '2-3 weeks',
          budget: '$5,000 - $10,000',
          preferredStartDate: '2024-02-01',
          additionalRequirements: 'PCI DSS compliance required',
          status: 'in-progress',
          submittedAt: '2024-01-15T10:30:00Z',
          assignedTester: 'Security Expert',
          testerId: 'tester-1',
          userId: 'user-1',
          progress: 65,
          testingPhase: 'Vulnerability Assessment',
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
              id: 'finding-1',
              title: 'SQL Injection in Login Form',
              severity: 'critical',
              description: 'The login form is vulnerable to SQL injection attacks',
              impact: 'Attackers could gain unauthorized access to the database',
              recommendation: 'Implement parameterized queries',
              status: 'open',
              foundAt: '2024-01-20T14:30:00Z'
            }
          ],
          documents: [
            {
              id: 'doc-1',
              name: 'Preliminary Report.pdf',
              type: 'PDF',
              size: '2.4 MB',
              uploadDate: '2024-01-22',
              category: 'report',
              downloadUrl: '/reports/preliminary-report.pdf',
              status: 'ready'
            }
          ],
          timeline: [
            {
              id: 'timeline-1',
              phase: 'Planning & Scoping',
              status: 'completed',
              startDate: '2024-01-15',
              endDate: '2024-01-17',
              description: 'Define audit scope and methodology'
            },
            {
              id: 'timeline-2',
              phase: 'Vulnerability Assessment',
              status: 'in-progress',
              startDate: '2024-01-18',
              description: 'Active testing and vulnerability identification'
            }
          ]
        }
      ];
      setAuditRequests(initialRequests);
      localStorage.setItem('auditRequests', JSON.stringify(initialRequests));
    }
  }, []);

  // Save to localStorage whenever requests change
  useEffect(() => {
    localStorage.setItem('auditRequests', JSON.stringify(auditRequests));
  }, [auditRequests]);

  const submitAuditRequest = (requestData: Omit<AuditRequest, 'id' | 'submittedAt' | 'status' | 'progress' | 'testingPhase' | 'vulnerabilities' | 'findings' | 'documents' | 'timeline'>) => {
    const newRequest: AuditRequest = {
      ...requestData,
      id: `audit-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      progress: 0,
      testingPhase: 'Pending Approval',
      vulnerabilities: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        informational: 0,
        total: 0
      },
      findings: [],
      documents: [],
      timeline: [
        {
          id: `timeline-${Date.now()}`,
          phase: 'Request Submitted',
          status: 'completed',
          startDate: new Date().toISOString().split('T')[0],
          description: 'Audit request submitted for review'
        }
      ]
    };

    setAuditRequests(prev => [...prev, newRequest]);
  };

  const approveRequest = (requestId: string, testerId: string) => {
    setAuditRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: 'assigned' as const,
          testerId,
          assignedTester: 'Security Expert',
          testingPhase: 'Planning & Scoping',
          timeline: [
            ...request.timeline,
            {
              id: `timeline-${Date.now()}`,
              phase: 'Request Approved',
              status: 'completed' as const,
              startDate: new Date().toISOString().split('T')[0],
              description: 'Request approved and assigned to tester'
            }
          ]
        };
      }
      return request;
    }));
  };

  const rejectRequest = (requestId: string, reason: string) => {
    setAuditRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: 'rejected' as const,
          timeline: [
            ...request.timeline,
            {
              id: `timeline-${Date.now()}`,
              phase: 'Request Rejected',
              status: 'completed' as const,
              startDate: new Date().toISOString().split('T')[0],
              description: `Request rejected: ${reason}`
            }
          ]
        };
      }
      return request;
    }));
  };

  const updateAuditStatus = (requestId: string, status: AuditRequest['status'], updates?: Partial<AuditRequest>) => {
    setAuditRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        const updatedRequest = {
          ...request,
          status,
          ...updates,
          timeline: [
            ...request.timeline,
            {
              id: `timeline-${Date.now()}`,
              phase: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' '),
              status: 'completed' as const,
              startDate: new Date().toISOString().split('T')[0],
              description: `Status updated to ${status.replace('-', ' ')}`
            }
          ]
        };

        if (status === 'completed') {
          updatedRequest.completedAt = new Date().toISOString();
          updatedRequest.progress = 100;
          updatedRequest.testingPhase = 'Completed';
        }

        return updatedRequest;
      }
      return request;
    }));
  };

  const addFinding = (requestId: string, findingData: Omit<Finding, 'id' | 'foundAt'>) => {
    const newFinding: Finding = {
      ...findingData,
      id: `finding-${Date.now()}`,
      foundAt: new Date().toISOString()
    };

    setAuditRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        const updatedFindings = [...request.findings, newFinding];
        const vulnerabilities = {
          critical: updatedFindings.filter(f => f.severity === 'critical').length,
          high: updatedFindings.filter(f => f.severity === 'high').length,
          medium: updatedFindings.filter(f => f.severity === 'medium').length,
          low: updatedFindings.filter(f => f.severity === 'low').length,
          informational: updatedFindings.filter(f => f.severity === 'informational').length,
          total: updatedFindings.length
        };

        return {
          ...request,
          findings: updatedFindings,
          vulnerabilities
        };
      }
      return request;
    }));
  };

  const updateProgress = (requestId: string, progress: number, phase: string) => {
    setAuditRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          progress,
          testingPhase: phase
        };
      }
      return request;
    }));
  };

  const uploadDocument = (requestId: string, documentData: Omit<Document, 'id' | 'uploadDate'>) => {
    const newDocument: Document = {
      ...documentData,
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setAuditRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          documents: [...request.documents, newDocument]
        };
      }
      return request;
    }));
  };

  const generateReport = (requestId: string) => {
    const reportDocument: Document = {
      id: `report-${Date.now()}`,
      name: 'Final Security Audit Report.pdf',
      type: 'PDF',
      size: '5.2 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      category: 'report',
      downloadUrl: `/reports/final-report-${requestId}.pdf`,
      status: 'ready'
    };

    setAuditRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          documents: [...request.documents, reportDocument],
          reportUrl: reportDocument.downloadUrl
        };
      }
      return request;
    }));
  };

  const requestReaudit = (originalRequestId: string, updates: Partial<AuditRequest>) => {
    const originalRequest = auditRequests.find(r => r.id === originalRequestId);
    if (!originalRequest) return;

    const reauditRequest: AuditRequest = {
      ...originalRequest,
      ...updates,
      id: `reaudit-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      progress: 0,
      testingPhase: 'Pending Approval',
      vulnerabilities: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        informational: 0,
        total: 0
      },
      findings: [],
      documents: [],
      timeline: [
        {
          id: `timeline-${Date.now()}`,
          phase: 'Re-audit Requested',
          status: 'completed',
          startDate: new Date().toISOString().split('T')[0],
          description: `Re-audit requested for ${originalRequest.companyName}`
        }
      ]
    };

    setAuditRequests(prev => [...prev, reauditRequest]);
  };

  const getUserRequests = (userId: string) => {
    return auditRequests.filter(request => request.userId === userId);
  };

  const getTesterRequests = (testerId: string) => {
    return auditRequests.filter(request => request.testerId === testerId);
  };

  const getPendingRequests = () => {
    return auditRequests.filter(request => request.status === 'pending');
  };

  const value: WorkflowContextType = {
    auditRequests,
    currentUser,
    submitAuditRequest,
    approveRequest,
    rejectRequest,
    updateAuditStatus,
    addFinding,
    updateProgress,
    uploadDocument,
    generateReport,
    requestReaudit,
    getUserRequests,
    getTesterRequests,
    getPendingRequests
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};