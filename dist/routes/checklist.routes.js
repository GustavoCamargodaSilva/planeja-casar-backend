"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checklist_controller_1 = require("../controllers/checklist.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Criar nova tarefa
router.post('/', auth_1.authenticate, checklist_controller_1.checklistController.create.bind(checklist_controller_1.checklistController));
// Listar todas as tarefas
router.get('/', auth_1.authenticate, checklist_controller_1.checklistController.findAll.bind(checklist_controller_1.checklistController));
// Obter estatísticas
router.get('/stats', auth_1.authenticate, checklist_controller_1.checklistController.getStats.bind(checklist_controller_1.checklistController));
// Buscar tarefa por ID
router.get('/:id', auth_1.authenticate, checklist_controller_1.checklistController.findById.bind(checklist_controller_1.checklistController));
// Atualizar tarefa
router.put('/:id', auth_1.authenticate, checklist_controller_1.checklistController.update.bind(checklist_controller_1.checklistController));
// Alternar status da tarefa
router.patch('/:id/toggle', auth_1.authenticate, checklist_controller_1.checklistController.toggleStatus.bind(checklist_controller_1.checklistController));
// Deletar tarefa
router.delete('/:id', auth_1.authenticate, checklist_controller_1.checklistController.delete.bind(checklist_controller_1.checklistController));
exports.default = router;
//# sourceMappingURL=checklist.routes.js.map