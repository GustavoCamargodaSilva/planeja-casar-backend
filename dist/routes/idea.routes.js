"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/idea.routes.ts
const express_1 = require("express");
const idea_controller_1 = __importDefault(require("../controllers/idea.controller"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Todas as rotas de ideias requerem autenticação
router.use(auth_1.authenticate);
// POST /api/ideas - Criar nova ideia
router.post('/', idea_controller_1.default.create.bind(idea_controller_1.default));
// GET /api/ideas/stats - Obter estatísticas (deve vir antes de /:id)
router.get('/stats', idea_controller_1.default.getStats.bind(idea_controller_1.default));
// GET /api/ideas - Listar ideias com filtros
router.get('/', idea_controller_1.default.findAll.bind(idea_controller_1.default));
// GET /api/ideas/:id - Buscar ideia por ID
router.get('/:id', idea_controller_1.default.findById.bind(idea_controller_1.default));
// PUT /api/ideas/:id - Atualizar ideia
router.put('/:id', idea_controller_1.default.update.bind(idea_controller_1.default));
// PATCH /api/ideas/:id/toggle-favorite - Alternar status de favorito
router.patch('/:id/toggle-favorite', idea_controller_1.default.toggleFavorite.bind(idea_controller_1.default));
// DELETE /api/ideas/:id - Deletar ideia
router.delete('/:id', idea_controller_1.default.delete.bind(idea_controller_1.default));
exports.default = router;
//# sourceMappingURL=idea.routes.js.map