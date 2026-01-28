import { Router } from 'express';
import { guestController } from '../controllers/guest.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Todas as rotas requerem autenticação
router.post('/', authenticate, guestController.create.bind(guestController));
router.get('/', authenticate, guestController.findAll.bind(guestController));
router.get('/stats', authenticate, guestController.getStats.bind(guestController));
router.get('/:id', authenticate, guestController.findById.bind(guestController));
router.put('/:id', authenticate, guestController.update.bind(guestController));
router.delete('/:id', authenticate, guestController.delete.bind(guestController));

export default router;
