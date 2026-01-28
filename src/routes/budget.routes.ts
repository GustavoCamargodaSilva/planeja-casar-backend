import { Router } from 'express';
import budgetController from '../controllers/budget.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Todas as rotas requerem autenticação
router.use(authenticate);

// POST /api/budgets - Criar novo orçamento
router.post('/', budgetController.create.bind(budgetController));

// GET /api/budgets - Listar orçamentos com filtros
router.get('/', budgetController.getAll.bind(budgetController));

// GET /api/budgets/stats - Obter estatísticas
router.get('/stats', budgetController.getStats.bind(budgetController));

// GET /api/budgets/:id - Buscar orçamento por ID
router.get('/:id', budgetController.getById.bind(budgetController));

// PUT /api/budgets/:id - Atualizar orçamento
router.put('/:id', budgetController.update.bind(budgetController));

// PATCH /api/budgets/:id/approve - Aprovar orçamento
router.patch('/:id/approve', budgetController.approve.bind(budgetController));

// PATCH /api/budgets/:id/reject - Rejeitar orçamento
router.patch('/:id/reject', budgetController.reject.bind(budgetController));

// DELETE /api/budgets/:id - Deletar orçamento
router.delete('/:id', budgetController.delete.bind(budgetController));

export default router;
