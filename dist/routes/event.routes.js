"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Todas as rotas de eventos são protegidas
router.post('/', auth_1.authenticate, event_controller_1.eventController.create.bind(event_controller_1.eventController));
router.get('/', auth_1.authenticate, event_controller_1.eventController.findAll.bind(event_controller_1.eventController));
router.get('/:id', auth_1.authenticate, event_controller_1.eventController.findById.bind(event_controller_1.eventController));
router.put('/:id', auth_1.authenticate, event_controller_1.eventController.update.bind(event_controller_1.eventController));
router.delete('/:id', auth_1.authenticate, event_controller_1.eventController.delete.bind(event_controller_1.eventController));
router.post('/join', auth_1.authenticate, event_controller_1.eventController.join.bind(event_controller_1.eventController));
exports.default = router;
//# sourceMappingURL=event.routes.js.map