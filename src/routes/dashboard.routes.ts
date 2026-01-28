// src/routes/dashboard.routes.ts
import { Router } from 'express';
import dashboardController from '../controllers/dashboard.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/dashboard/kpis - Get KPIs
router.get('/kpis', dashboardController.getKPIs.bind(dashboardController));

// GET /api/dashboard/upcoming-tasks - Get upcoming tasks
router.get('/upcoming-tasks', dashboardController.getUpcomingTasks.bind(dashboardController));

// GET /api/dashboard/progress-by-area - Get progress by checklist category
router.get('/progress-by-area', dashboardController.getProgressByArea.bind(dashboardController));

// GET /api/dashboard/vendors-status - Get vendors status count
router.get('/vendors-status', dashboardController.getVendorsStatus.bind(dashboardController));

// GET /api/dashboard/budget-snapshot - Get budget snapshot by category
router.get('/budget-snapshot', dashboardController.getBudgetSnapshot.bind(dashboardController));

export default router;
