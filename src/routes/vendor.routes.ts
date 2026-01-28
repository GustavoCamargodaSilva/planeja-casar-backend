import { Router } from 'express';
import vendorController from '../controllers/vendor.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Todas as rotas requerem autenticação
router.use(authenticate);

// POST /api/vendors - Criar novo fornecedor
router.post('/', vendorController.create.bind(vendorController));

// GET /api/vendors - Listar fornecedores com filtros
router.get('/', vendorController.getAll.bind(vendorController));

// GET /api/vendors/stats - Obter estatísticas
router.get('/stats', vendorController.getStats.bind(vendorController));

// GET /api/vendors/:id - Buscar fornecedor por ID
router.get('/:id', vendorController.getById.bind(vendorController));

// PUT /api/vendors/:id - Atualizar fornecedor
router.put('/:id', vendorController.update.bind(vendorController));

// PATCH /api/vendors/:id/mark-paid - Marcar como pago
router.patch('/:id/mark-paid', vendorController.markAsPaid.bind(vendorController));

// PATCH /api/vendors/:id/mark-overdue - Marcar como atrasado
router.patch('/:id/mark-overdue', vendorController.markAsOverdue.bind(vendorController));

// DELETE /api/vendors/:id - Deletar fornecedor
router.delete('/:id', vendorController.delete.bind(vendorController));

export default router;
