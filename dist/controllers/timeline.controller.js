"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timelineController = exports.TimelineController = void 0;
const zod_1 = require("zod");
const timeline_service_1 = require("../services/timeline.service");
const timeline_schema_1 = require("../schemas/timeline.schema");
class TimelineController {
    /**
     * POST /timeline
     * Criar nova tarefa do cronograma
     */
    async create(req, res, next) {
        try {
            const validatedData = timeline_schema_1.CreateTimelineTaskSchema.parse(req.body);
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
            const task = await timeline_service_1.timelineService.create(eventId, validatedData);
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
     * GET /timeline
     * Listar todas as tarefas do cronograma com filtros opcionais
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
            const filters = timeline_schema_1.TimelineFiltersSchema.parse({
                status: req.query.status,
                search: req.query.search,
            });
            const tasks = await timeline_service_1.timelineService.findAll(eventId, filters);
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
     * GET /timeline/stats
     * Obter estatísticas do cronograma
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
            const stats = await timeline_service_1.timelineService.getStats(eventId);
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
     * GET /timeline/:id
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
            const task = await timeline_service_1.timelineService.findById(id);
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
     * PUT /timeline/:id
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
            const validatedData = timeline_schema_1.UpdateTimelineTaskSchema.parse(req.body);
            const task = await timeline_service_1.timelineService.update(id, validatedData);
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
     * DELETE /timeline/:id
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
            await timeline_service_1.timelineService.delete(id);
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
exports.TimelineController = TimelineController;
exports.timelineController = new TimelineController();
//# sourceMappingURL=timeline.controller.js.map