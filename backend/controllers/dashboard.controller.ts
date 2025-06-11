import { Request, Response } from 'express';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Mock dashboard statistics
    const stats = {
      totalAudits: 24,
      completedAudits: 18,
      pendingAudits: 6,
      totalDocuments: 156,
      recentActivity: 12
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
};

export const getAudits = async (req: Request, res: Response) => {
  try {
    // Mock audit data
    const audits = [
      {
        id: 1,
        title: 'Security Audit - Q4 2024',
        status: 'completed',
        date: '2024-12-15',
        type: 'security',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Compliance Review',
        status: 'in-progress',
        date: '2024-12-20',
        type: 'compliance',
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Financial Audit',
        status: 'pending',
        date: '2024-12-25',
        type: 'financial',
        priority: 'high'
      }
    ];

    res.status(200).json({
      success: true,
      data: audits
    });
  } catch (error) {
    console.error('Error fetching audits:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch audits'
    });
  }
};

export const getDocuments = async (req: Request, res: Response) => {
  try {
    // Mock document data
    const documents = [
      {
        id: 1,
        name: 'Audit Report Q4 2024.pdf',
        type: 'pdf',
        size: '2.4 MB',
        uploadDate: '2024-12-15',
        status: 'approved'
      },
      {
        id: 2,
        name: 'Compliance Checklist.xlsx',
        type: 'excel',
        size: '1.2 MB',
        uploadDate: '2024-12-18',
        status: 'pending'
      },
      {
        id: 3,
        name: 'Security Policy.docx',
        type: 'word',
        size: '856 KB',
        uploadDate: '2024-12-20',
        status: 'approved'
      }
    ];

    res.status(200).json({
      success: true,
      data: documents
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch documents'
    });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    // Mock notification data
    const notifications = [
      {
        id: 1,
        title: 'New audit assigned',
        message: 'You have been assigned to Security Audit - Q4 2024',
        type: 'info',
        timestamp: '2024-12-20T10:30:00Z',
        read: false
      },
      {
        id: 2,
        title: 'Document approved',
        message: 'Your audit report has been approved',
        type: 'success',
        timestamp: '2024-12-19T15:45:00Z',
        read: false
      },
      {
        id: 3,
        title: 'Deadline reminder',
        message: 'Compliance review due in 3 days',
        type: 'warning',
        timestamp: '2024-12-18T09:00:00Z',
        read: true
      }
    ];

    res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    });
  }
};