"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budget_controller_1 = __importDefault(require("../controllers/budget.controller"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Todas as rotas requerem autenticação
router.use(auth_1.authenticate);
// POST /api/budgets - Criar novo orçamento
router.post('/', budget_controller_1.default.create.bind(budget_controller_1.default));
// GET /api/budgets - Listar orçamentos com filtros
router.get('/', budget_controller_1.default.getAll.bind(budget_controller_1.default));
// GET /api/budgets/stats - Obter estatísticas
router.get('/stats', budget_controller_1.default.getStats.bind(budget_controller_1.default));
// GET /api/budgets/:id - Buscar orçamento por ID
router.get('/:id', budget_controller_1.default.getById.bind(budget_controller_1.default));
// PUT /api/budgets/:id - Atualizar orçamento
router.put('/:id', budget_controller_1.default.update.bind(budget_controller_1.default));
// PATCH /api/budgets/:id/approve - Aprovar orçamento
router.patch('/:id/approve', budget_controller_1.default.approve.bind(budget_controller_1.default));
// PATCH /api/budgets/:id/reject - Rejeitar orçamento
router.patch('/:id/reject', budget_controller_1.default.reject.bind(budget_controller_1.default));
// DELETE /api/budgets/:id - Deletar orçamento
router.delete('/:id', budget_controller_1.default.delete.bind(budget_controller_1.default));
exports.default = router;
//# sourceMappingURL=budget.routes.js.map