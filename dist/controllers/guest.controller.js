"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestController = exports.GuestController = void 0;
const zod_1 = require("zod");
const guest_service_1 = __importDefault(require("../services/guest.service"));
const guest_schema_1 = require("../schemas/guest.schema");
class GuestController {
    async create(req, res, next) {
        try {
            const validatedData = guest_schema_1.CreateGuestSchema.parse(req.body);
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
            const guest = await guest_service_1.default.create(eventId, validatedData);
            res.status(201).json({
                success: true,
                data: {
                    guest,
                    message: 'Convidado criado com sucesso',
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
            const filters = guest_schema_1.GuestFiltersSchema.parse({
                status: req.query.status,
                type: req.query.type,
                side: req.query.side,
                search: req.query.search,
            });
            const guests = await guest_service_1.default.findAll(eventId, filters);
            res.json({
                success: true,
                data: { guests },
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
            const stats = await guest_service_1.default.getStats(eventId);
            res.json({
                success: true,
                data: { stats },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async findById(req, res, next) {
        try {
            const id = req.params.id;
            const guest = await guest_service_1.default.findById(id);
            res.json({
                success: true,
                data: { guest },
            });
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === 'GUEST_NOT_FOUND') {
                    return res.status(404).json({
                        success: false,
                        error: {
                            code: 'GUEST_NOT_FOUND',
                            message: 'Convidado não encontrado',
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
            const validatedData = guest_schema_1.UpdateGuestSchema.parse(req.body);
            const guest = await guest_service_1.default.update(id, validatedData);
            res.json({
                success: true,
                data: {
                    guest,
                    message: 'Convidado atualizado com sucesso',
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
                if (error.message === 'GUEST_NOT_FOUND') {
                    return res.status(404).json({
                        success: false,
                        error: {
                            code: 'GUEST_NOT_FOUND',
                            message: 'Convidado não encontrado',
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
            const result = await guest_service_1.default.delete(id);
            res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === 'GUEST_NOT_FOUND') {
                    return res.status(404).json({
                        success: false,
                        error: {
                            code: 'GUEST_NOT_FOUND',
                            message: 'Convidado não encontrado',
                        },
                    });
                }
            }
            next(error);
        }
    }
}
exports.GuestController = GuestController;
exports.guestController = new GuestController();
//# sourceMappingURL=guest.controller.js.map