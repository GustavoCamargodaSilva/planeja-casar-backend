"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Rotas publicas
router.post('/register', auth_controller_1.authController.register.bind(auth_controller_1.authController));
router.post('/login', auth_controller_1.authController.login.bind(auth_controller_1.authController));
router.post('/forgot-password', auth_controller_1.authController.forgotPassword.bind(auth_controller_1.authController));
router.post('/reset-password', auth_controller_1.authController.resetPassword.bind(auth_controller_1.authController));
// Rotas protegidas
router.get('/me', auth_1.authenticate, auth_controller_1.authController.me.bind(auth_controller_1.authController));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map