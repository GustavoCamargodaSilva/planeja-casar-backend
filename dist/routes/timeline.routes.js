"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timeline_controller_1 = require("../controllers/timeline.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Criar nova tarefa
router.post('/', auth_1.authenticate, timeline_controller_1.timelineController.create.bind(timeline_controller_1.timelineController));
// Listar todas as tarefas
router.get('/', auth_1.authenticate, timeline_controller_1.timelineController.findAll.bind(timeline_controller_1.timelineController));
// Obter estatísticas
router.get('/stats', auth_1.authenticate, timeline_controller_1.timelineController.getStats.bind(timeline_controller_1.timelineController));
// Buscar tarefa por ID
router.get('/:id', auth_1.authenticate, timeline_controller_1.timelineController.findById.bind(timeline_controller_1.timelineController));
// Atualizar tarefa
router.put('/:id', auth_1.authenticate, timeline_controller_1.timelineController.update.bind(timeline_controller_1.timelineController));
// Deletar tarefa
router.delete('/:id', auth_1.authenticate, timeline_controller_1.timelineController.delete.bind(timeline_controller_1.timelineController));
exports.default = router;
//# sourceMappingURL=timeline.routes.js.map