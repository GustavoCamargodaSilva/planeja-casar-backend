"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/dashboard.routes.ts
const express_1 = require("express");
const dashboard_controller_1 = __importDefault(require("../controllers/dashboard.controller"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authenticate);
// GET /api/dashboard/kpis - Get KPIs
router.get('/kpis', dashboard_controller_1.default.getKPIs.bind(dashboard_controller_1.default));
// GET /api/dashboard/upcoming-tasks - Get upcoming tasks
router.get('/upcoming-tasks', dashboard_controller_1.default.getUpcomingTasks.bind(dashboard_controller_1.default));
// GET /api/dashboard/progress-by-area - Get progress by checklist category
router.get('/progress-by-area', dashboard_controller_1.default.getProgressByArea.bind(dashboard_controller_1.default));
// GET /api/dashboard/vendors-status - Get vendors status count
router.get('/vendors-status', dashboard_controller_1.default.getVendorsStatus.bind(dashboard_controller_1.default));
// GET /api/dashboard/budget-snapshot - Get budget snapshot by category
router.get('/budget-snapshot', dashboard_controller_1.default.getBudgetSnapshot.bind(dashboard_controller_1.default));
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map