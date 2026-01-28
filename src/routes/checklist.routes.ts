import { Router } from 'express';
import { checklistController } from '../controllers/checklist.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Criar nova tarefa
router.post('/', authenticate, checklistController.create.bind(checklistController));

// Listar todas as tarefas
router.get('/', authenticate, checklistController.findAll.bind(checklistController));

// Obter estatísticas
router.get('/stats', authenticate, checklistController.getStats.bind(checklistController));

// Buscar tarefa por ID
router.get('/:id', authenticate, checklistController.findById.bind(checklistController));

// Atualizar tarefa
router.put('/:id', authenticate, checklistController.update.bind(checklistController));

// Alternar status da tarefa
router.patch('/:id/toggle', authenticate, checklistController.toggleStatus.bind(checklistController));

// Deletar tarefa
router.delete('/:id', authenticate, checklistController.delete.bind(checklistController));

export default router;
