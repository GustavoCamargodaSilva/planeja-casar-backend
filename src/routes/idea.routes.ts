// src/routes/idea.routes.ts
import { Router } from 'express';
import ideaController from '../controllers/idea.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Todas as rotas de ideias requerem autenticação
router.use(authenticate);

// POST /api/ideas - Criar nova ideia
router.post('/', ideaController.create.bind(ideaController));

// GET /api/ideas/stats - Obter estatísticas (deve vir antes de /:id)
router.get('/stats', ideaController.getStats.bind(ideaController));

// GET /api/ideas - Listar ideias com filtros
router.get('/', ideaController.findAll.bind(ideaController));

// GET /api/ideas/:id - Buscar ideia por ID
router.get('/:id', ideaController.findById.bind(ideaController));

// PUT /api/ideas/:id - Atualizar ideia
router.put('/:id', ideaController.update.bind(ideaController));

// PATCH /api/ideas/:id/toggle-favorite - Alternar status de favorito
router.patch('/:id/toggle-favorite', ideaController.toggleFavorite.bind(ideaController));

// DELETE /api/ideas/:id - Deletar ideia
router.delete('/:id', ideaController.delete.bind(ideaController));

export default router;
