import { Router } from 'express';
import authRoutes from './auth.routes';
import eventRoutes from './event.routes';
import guestRoutes from './guest.routes';
import checklistRoutes from './checklist.routes';
import timelineRoutes from './timeline.routes';
import budgetRoutes from './budget.routes';
import vendorRoutes from './vendor.routes';
import ideaRoutes from './idea.routes';
import dashboardRoutes from './dashboard.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    },
  });
});

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/guests', guestRoutes);
router.use('/checklist', checklistRoutes);
router.use('/timeline', timelineRoutes);
router.use('/budgets', budgetRoutes);
router.use('/vendors', vendorRoutes);
router.use('/ideas', ideaRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
