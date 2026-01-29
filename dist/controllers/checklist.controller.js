"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklistController = exports.ChecklistController = void 0;
const zod_1 = require("zod");
const checklist_service_1 = require("../services/checklist.service");
const checklist_schema_1 = require("../schemas/checklist.schema");
class ChecklistController {
    /**
     * POST /checklist
     * Criar nova tarefa do checklist
     */
    async create(req, res, next) {
        try {
            const validatedData = checklist_schema_1.CreateChecklistTaskSchema.parse(req.body);
            const { eventId } = req.body;
            if (!eventId) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'eventId é obrigatório',
                    },
                });
            }
            const task = await checklist_service_1.checklistService.create(eventId, validatedData);
            res.status(201).json({
                success: true,
                data: {
                    task,
                    message: 'Tarefa criada com sucesso',
                },
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Erro de validação',
                        details: error.issues,
                    },
                });
            }
            next(error);
        }
    }
    /**
     * GET /checklist
     * Listar todas as tarefas do checklist com filtros opcionais
     */
    async findAll(req, res, next) {
        try {
            const { eventId } = req.query;
            if (!eventId || typeof eventId !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'eventId é obrigatório',
                    },
                });
            }
            const filters = checklist_schema_1.ChecklistFiltersSchema.parse({
                status: req.query.status,
                category: req.query.category,
                priority: req.query.priority,
                search: req.query.search,
            });
            const tasks = await checklist_service_1.checklistService.findAll(eventId, filters);
            res.json({
                success: true,
                data: {
                    tasks,
                },
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Erro de validação',
                        details: error.issues,
                    },
                });
            }
            next(error);
        }
    }
    /**
     * GET /checklist/stats
     * Obter estatísticas do checklist
     */
    async getStats(req, res, next) {
        try {
            const { eventId } = req.query;
            if (!eventId || typeof eventId !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'eventId é obrigatório',
                    },
                });
            }
            const stats = await checklist_service_1.checklistService.getStats(eventId);
            res.json({
                success: true,
                data: {
                    stats,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /checklist/:id
     * Buscar tarefa por ID
     */
    async findById(req, res, next) {
        try {
            const { id } = req.params;
            if (typeof id !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'ID inválido',
                    },
                });
            }
            const task = await checklist_service_1.checklistService.findById(id);
            if (!task) {
                return res.status(404).json({
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: 'Tarefa não encontrada',
                    },
                });
            }
            res.json({
                success: true,
                data: {
                    task,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /checklist/:id
     * Atualizar tarefa
     */
    async update(req, res, next) {
        try {
            const { id } = req.params;
            if (typeof id !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'ID inválido',
                    },
                });
            }
            const validatedData = checklist_schema_1.UpdateChecklistTaskSchema.parse(req.body);
            const task = await checklist_service_1.checklistService.update(id, validatedData);
            res.json({
                success: true,
                data: {
                    task,
                    message: 'Tarefa atualizada com sucesso',
                },
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Erro de validação',
                        details: error.issues,
                    },
                });
            }
            next(error);
        }
    }
    /**
     * PATCH /checklist/:id/toggle
     * Alternar status da tarefa entre pending e completed
     */
    async toggleStatus(req, res, next) {
        try {
            const { id } = req.params;
            if (typeof id !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'ID inválido',
                    },
                });
            }
            const task = await checklist_service_1.checklistService.toggleStatus(id);
            res.json({
                success: true,
                data: {
                    task,
                    message: 'Status da tarefa alterado com sucesso',
                },
            });
        }
        catch (error) {
            if (error instanceof Error && error.message === 'Tarefa não encontrada') {
                return res.status(404).json({
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: error.message,
                    },
                });
            }
            next(error);
        }
    }
    /**
     * DELETE /checklist/:id
     * Deletar tarefa
     */
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (typeof id !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'ID inválido',
                    },
                });
            }
            await checklist_service_1.checklistService.delete(id);
            res.json({
                success: true,
                data: {
                    message: 'Tarefa deletada com sucesso',
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ChecklistController = ChecklistController;
exports.checklistController = new ChecklistController();
//# sourceMappingURL=checklist.controller.js.map