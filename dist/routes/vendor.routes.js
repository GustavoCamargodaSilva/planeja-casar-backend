"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendor_controller_1 = __importDefault(require("../controllers/vendor.controller"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Todas as rotas requerem autenticação
router.use(auth_1.authenticate);
// POST /api/vendors - Criar novo fornecedor
router.post('/', vendor_controller_1.default.create.bind(vendor_controller_1.default));
// GET /api/vendors - Listar fornecedores com filtros
router.get('/', vendor_controller_1.default.getAll.bind(vendor_controller_1.default));
// GET /api/vendors/stats - Obter estatísticas
router.get('/stats', vendor_controller_1.default.getStats.bind(vendor_controller_1.default));
// GET /api/vendors/:id - Buscar fornecedor por ID
router.get('/:id', vendor_controller_1.default.getById.bind(vendor_controller_1.default));
// PUT /api/vendors/:id - Atualizar fornecedor
router.put('/:id', vendor_controller_1.default.update.bind(vendor_controller_1.default));
// PATCH /api/vendors/:id/mark-paid - Marcar como pago
router.patch('/:id/mark-paid', vendor_controller_1.default.markAsPaid.bind(vendor_controller_1.default));
// PATCH /api/vendors/:id/mark-overdue - Marcar como atrasado
router.patch('/:id/mark-overdue', vendor_controller_1.default.markAsOverdue.bind(vendor_controller_1.default));
// DELETE /api/vendors/:id - Deletar fornecedor
router.delete('/:id', vendor_controller_1.default.delete.bind(vendor_controller_1.default));
exports.default = router;
//# sourceMappingURL=vendor.routes.js.map