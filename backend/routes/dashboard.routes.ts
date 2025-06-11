import { Router } from 'express';
import { 
  getDashboardStats, 
  getAudits, 
  getDocuments, 
  getNotifications 
} from '../controllers/dashboard.controller';

const router = Router();

// Dashboard statistics endpoint
router.get('/stats', getDashboardStats);

// Audits endpoint
router.get('/audits', getAudits);

// Documents endpoint
router.get('/documents', getDocuments);

// Notifications endpoint
router.get('/notifications', getNotifications);

export default router;