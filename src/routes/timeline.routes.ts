import { Router } from 'express';
import { timelineController } from '../controllers/timeline.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Criar nova tarefa
router.post('/', authenticate, timelineController.create.bind(timelineController));

// Listar todas as tarefas
router.get('/', authenticate, timelineController.findAll.bind(timelineController));

// Obter estatísticas
router.get('/stats', authenticate, timelineController.getStats.bind(timelineController));

// Buscar tarefa por ID
router.get('/:id', authenticate, timelineController.findById.bind(timelineController));

// Atualizar tarefa
router.put('/:id', authenticate, timelineController.update.bind(timelineController));

// Deletar tarefa
router.delete('/:id', authenticate, timelineController.delete.bind(timelineController));

export default router;
