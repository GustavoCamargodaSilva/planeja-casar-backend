"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetController = void 0;
const budget_service_1 = __importDefault(require("../services/budget.service"));
const budget_schema_1 = require("../schemas/budget.schema");
const zod_1 = require("zod");
class BudgetController {
    /**
     * POST /budgets
     * Criar novo orçamento
     */
    async create(req, res) {
        try {
            const validatedData = budget_schema_1.CreateBudgetSchema.parse(req.body);
            const budget = await budget_service_1.default.create(validatedData);
            res.status(201).json({
                success: true,
                data: {
                    budget,
                },
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Dados inválidos',
                        details: error.issues,
                    },
                });
            }
            console.error('Error creating budget:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao criar orçamento',
                },
            });
        }
    }
    /**
     * GET /budgets
     * Listar orçamentos com filtros
     */
    async getAll(req, res) {
        try {
            const filters = budget_schema_1.BudgetFiltersSchema.parse({
                eventId: req.query.eventId,
                status: req.query.status,
                category: req.query.category,
                search: req.query.search,
            });
            const budgets = await budget_service_1.default.findAll(filters);
            res.json({
                success: true,
                data: {
                    budgets,
                },
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Filtros inválidos',
                        details: error.issues,
                    },
                });
            }
            console.error('Error fetching budgets:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao buscar orçamentos',
                },
            });
        }
    }
    /**
     * GET /budgets/stats
     * Obter estatísticas dos orçamentos
     */
    async getStats(req, res) {
        try {
            const eventId = req.query.eventId;
            if (!eventId) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Event ID é obrigatório',
                    },
                });
            }
            const stats = await budget_service_1.default.getStats(eventId);
            res.json({
                success: true,
                data: {
                    stats,
                },
            });
        }
        catch (error) {
            console.error('Error fetching budget stats:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao buscar estatísticas',
                },
            });
        }
    }
    /**
     * GET /budgets/:id
     * Buscar orçamento por ID
     */
    async getById(req, res) {
        try {
            const id = req.params.id;
            const budget = await budget_service_1.default.findById(id);
            if (!budget) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: 'Orçamento não encontrado',
                    },
                });
            }
            res.json({
                success: true,
                data: {
                    budget,
                },
            });
        }
        catch (error) {
            console.error('Error fetching budget:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao buscar orçamento',
                },
            });
        }
    }
    /**
     * PUT /budgets/:id
     * Atualizar orçamento
     */
    async update(req, res) {
        try {
            const id = req.params.id;
            const validatedData = budget_schema_1.UpdateBudgetSchema.parse(req.body);
            const budget = await budget_service_1.default.update(id, validatedData);
            res.json({
                success: true,
                data: {
                    budget,
                },
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Dados inválidos',
                        details: error.issues,
                    },
                });
            }
            console.error('Error updating budget:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao atualizar orçamento',
                },
            });
        }
    }
    /**
     * PATCH /budgets/:id/approve
     * Aprovar orçamento
     */
    async approve(req, res) {
        try {
            const id = req.params.id;
            const budget = await budget_service_1.default.approve(id);
            res.json({
                success: true,
                data: {
                    budget,
                },
            });
        }
        catch (error) {
            console.error('Error approving budget:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao aprovar orçamento',
                },
            });
        }
    }
    /**
     * PATCH /budgets/:id/reject
     * Rejeitar orçamento
     */
    async reject(req, res) {
        try {
            const id = req.params.id;
            const budget = await budget_service_1.default.reject(id);
            res.json({
                success: true,
                data: {
                    budget,
                },
            });
        }
        catch (error) {
            console.error('Error rejecting budget:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao rejeitar orçamento',
                },
            });
        }
    }
    /**
     * DELETE /budgets/:id
     * Deletar orçamento
     */
    async delete(req, res) {
        try {
            const id = req.params.id;
            await budget_service_1.default.delete(id);
            res.json({
                success: true,
                data: {
                    message: 'Orçamento deletado com sucesso',
                },
            });
        }
        catch (error) {
            console.error('Error deleting budget:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao deletar orçamento',
                },
            });
        }
    }
}
exports.BudgetController = BudgetController;
exports.default = new BudgetController();
//# sourceMappingURL=budget.controller.js.map