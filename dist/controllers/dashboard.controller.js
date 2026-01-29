"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_1 = __importDefault(require("../services/dashboard.service"));
class DashboardController {
    /**
     * GET /api/dashboard/kpis
     * Get KPIs for the dashboard
     */
    async getKPIs(req, res) {
        try {
            const { eventId } = req.query;
            if (!eventId || typeof eventId !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'MISSING_EVENT_ID',
                        message: 'Event ID é obrigatório',
                    },
                });
            }
            const kpis = await dashboard_service_1.default.getKPIs(eventId);
            return res.status(200).json({
                success: true,
                data: { kpis },
            });
        }
        catch (error) {
            console.error('Error getting KPIs:', error);
            return res.status(500).json({
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: error.message || 'Erro ao buscar KPIs',
                },
            });
        }
    }
    /**
     * GET /api/dashboard/upcoming-tasks
     * Get upcoming tasks
     */
    async getUpcomingTasks(req, res) {
        try {
            const { eventId, limit } = req.query;
            if (!eventId || typeof eventId !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'MISSING_EVENT_ID',
                        message: 'Event ID é obrigatório',
                    },
                });
            }
            const limitNum = limit ? parseInt(limit, 10) : 5;
            const tasks = await dashboard_service_1.default.getUpcomingTasks(eventId, limitNum);
            return res.status(200).json({
                success: true,
                data: { tasks },
            });
        }
        catch (error) {
            console.error('Error getting upcoming tasks:', error);
            return res.status(500).json({
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: error.message || 'Erro ao buscar tarefas',
                },
            });
        }
    }
    /**
     * GET /api/dashboard/progress-by-area
     * Get progress by checklist category
     */
    async getProgressByArea(req, res) {
        try {
            const { eventId } = req.query;
            if (!eventId || typeof eventId !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'MISSING_EVENT_ID',
                        message: 'Event ID é obrigatório',
                    },
                });
            }
            const progress = await dashboard_service_1.default.getProgressByArea(eventId);
            return res.status(200).json({
                success: true,
                data: { progress },
            });
        }
        catch (error) {
            console.error('Error getting progress by area:', error);
            return res.status(500).json({
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: error.message || 'Erro ao buscar progresso',
                },
            });
        }
    }
    /**
     * GET /api/dashboard/vendors-status
     * Get vendors status count
     */
    async getVendorsStatus(req, res) {
        try {
            const { eventId } = req.query;
            if (!eventId || typeof eventId !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'MISSING_EVENT_ID',
                        message: 'Event ID é obrigatório',
                    },
                });
            }
            const vendorsStatus = await dashboard_service_1.default.getVendorsStatus(eventId);
            return res.status(200).json({
                success: true,
                data: { vendorsStatus },
            });
        }
        catch (error) {
            console.error('Error getting vendors status:', error);
            return res.status(500).json({
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: error.message || 'Erro ao buscar status de fornecedores',
                },
            });
        }
    }
    /**
     * GET /api/dashboard/budget-snapshot
     * Get budget snapshot by category
     */
    async getBudgetSnapshot(req, res) {
        try {
            const { eventId } = req.query;
            if (!eventId || typeof eventId !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'MISSING_EVENT_ID',
                        message: 'Event ID é obrigatório',
                    },
                });
            }
            const budgetSnapshot = await dashboard_service_1.default.getBudgetSnapshot(eventId);
            return res.status(200).json({
                success: true,
                data: { budgetSnapshot },
            });
        }
        catch (error) {
            console.error('Error getting budget snapshot:', error);
            return res.status(500).json({
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: error.message || 'Erro ao buscar resumo de orçamento',
                },
            });
        }
    }
}
exports.DashboardController = DashboardController;
exports.default = new DashboardController();
//# sourceMappingURL=dashboard.controller.js.map