"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guest_controller_1 = require("../controllers/guest.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Todas as rotas requerem autenticação
router.post('/', auth_1.authenticate, guest_controller_1.guestController.create.bind(guest_controller_1.guestController));
router.get('/', auth_1.authenticate, guest_controller_1.guestController.findAll.bind(guest_controller_1.guestController));
router.get('/stats', auth_1.authenticate, guest_controller_1.guestController.getStats.bind(guest_controller_1.guestController));
router.get('/:id', auth_1.authenticate, guest_controller_1.guestController.findById.bind(guest_controller_1.guestController));
router.put('/:id', auth_1.authenticate, guest_controller_1.guestController.update.bind(guest_controller_1.guestController));
router.delete('/:id', auth_1.authenticate, guest_controller_1.guestController.delete.bind(guest_controller_1.guestController));
exports.default = router;
//# sourceMappingURL=guest.routes.js.map