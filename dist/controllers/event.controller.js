"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventController = exports.EventController = void 0;
const event_service_1 = __importDefault(require("../services/event.service"));
const event_schema_1 = require("../schemas/event.schema");
const zod_1 = require("zod");
class EventController {
    async create(req, res, next) {
        try {
            const validatedData = event_schema_1.CreateEventSchema.parse(req.body);
            const userId = req.userId;
            const event = await event_service_1.default.create(userId, validatedData);
            res.status(201).json({
                success: true,
                data: {
                    event,
                    message: 'Evento criado com sucesso',
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
    async findAll(req, res, next) {
        try {
            const userId = req.userId;
            const events = await event_service_1.default.findByUser(userId);
            res.json({
                success: true,
                data: { events },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async findById(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.userId;
            const event = await event_service_1.default.findById(id, userId);
            res.json({
                success: true,
                data: { event },
            });
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === 'FORBIDDEN') {
                    return res.status(403).json({
                        success: false,
                        error: {
                            code: 'FORBIDDEN',
                            message: 'Você não tem permissão para acessar este evento',
                        },
                    });
                }
                if (error.message === 'EVENT_NOT_FOUND') {
                    return res.status(404).json({
                        success: false,
                        error: {
                            code: 'EVENT_NOT_FOUND',
                            message: 'Evento não encontrado',
                        },
                    });
                }
            }
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.userId;
            const validatedData = event_schema_1.UpdateEventSchema.parse(req.body);
            const event = await event_service_1.default.update(id, userId, validatedData);
            res.json({
                success: true,
                data: {
                    event,
                    message: 'Evento atualizado com sucesso',
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
            if (error instanceof Error) {
                if (error.message === 'FORBIDDEN') {
                    return res.status(403).json({
                        success: false,
                        error: {
                            code: 'FORBIDDEN',
                            message: 'Apenas o proprietário pode atualizar o evento',
                        },
                    });
                }
            }
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.userId;
            const result = await event_service_1.default.delete(id, userId);
            res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === 'FORBIDDEN') {
                    return res.status(403).json({
                        success: false,
                        error: {
                            code: 'FORBIDDEN',
                            message: 'Apenas o proprietário pode deletar o evento',
                        },
                    });
                }
            }
            next(error);
        }
    }
    async join(req, res, next) {
        try {
            const userId = req.userId;
            const validatedData = event_schema_1.JoinEventSchema.parse(req.body);
            const event = await event_service_1.default.joinByCode(userId, validatedData);
            res.status(200).json({
                success: true,
                data: {
                    event,
                    message: 'Você entrou no evento com sucesso',
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
            if (error instanceof Error) {
                if (error.message === 'INVALID_INVITE_CODE') {
                    return res.status(404).json({
                        success: false,
                        error: {
                            code: 'INVALID_INVITE_CODE',
                            message: 'Código de convite inválido',
                        },
                    });
                }
                if (error.message === 'ALREADY_MEMBER') {
                    return res.status(409).json({
                        success: false,
                        error: {
                            code: 'ALREADY_MEMBER',
                            message: 'Você já é membro deste evento',
                        },
                    });
                }
            }
            next(error);
        }
    }
}
exports.EventController = EventController;
exports.eventController = new EventController();
//# sourceMappingURL=event.controller.js.map