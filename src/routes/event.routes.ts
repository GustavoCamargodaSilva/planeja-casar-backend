import { Router } from 'express';
import { eventController } from '../controllers/event.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Todas as rotas de eventos são protegidas
router.post('/', authenticate, eventController.create.bind(eventController));
router.get('/', authenticate, eventController.findAll.bind(eventController));
router.get('/:id', authenticate, eventController.findById.bind(eventController));
router.put('/:id', authenticate, eventController.update.bind(eventController));
router.delete('/:id', authenticate, eventController.delete.bind(eventController));
router.post('/join', authenticate, eventController.join.bind(eventController));

export default router;
