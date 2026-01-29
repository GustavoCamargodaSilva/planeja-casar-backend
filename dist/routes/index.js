"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const event_routes_1 = __importDefault(require("./event.routes"));
const guest_routes_1 = __importDefault(require("./guest.routes"));
const checklist_routes_1 = __importDefault(require("./checklist.routes"));
const timeline_routes_1 = __importDefault(require("./timeline.routes"));
const budget_routes_1 = __importDefault(require("./budget.routes"));
const vendor_routes_1 = __importDefault(require("./vendor.routes"));
const idea_routes_1 = __importDefault(require("./idea.routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
const router = (0, express_1.Router)();
router.get('/health', (_req, res) => {
    res.json({
        success: true,
        data: {
            status: 'healthy',
            timestamp: new Date().toISOString(),
        },
    });
});
router.use('/auth', auth_routes_1.default);
router.use('/events', event_routes_1.default);
router.use('/guests', guest_routes_1.default);
router.use('/checklist', checklist_routes_1.default);
router.use('/timeline', timeline_routes_1.default);
router.use('/budgets', budget_routes_1.default);
router.use('/vendors', vendor_routes_1.default);
router.use('/ideas', idea_routes_1.default);
router.use('/dashboard', dashboard_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map