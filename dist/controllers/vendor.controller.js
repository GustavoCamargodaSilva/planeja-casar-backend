"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorController = void 0;
const vendor_service_1 = __importDefault(require("../services/vendor.service"));
const vendor_schema_1 = require("../schemas/vendor.schema");
const zod_1 = require("zod");
class VendorController {
    /**
     * POST /vendors
     * Criar novo fornecedor
     */
    async create(req, res) {
        try {
            const validatedData = vendor_schema_1.CreateVendorSchema.parse(req.body);
            const vendor = await vendor_service_1.default.create(validatedData);
            res.status(201).json({
                success: true,
                data: {
                    vendor,
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
            console.error('Error creating vendor:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao criar fornecedor',
                },
            });
        }
    }
    /**
     * GET /vendors
     * Listar fornecedores com filtros
     */
    async getAll(req, res) {
        try {
            const filters = vendor_schema_1.VendorFiltersSchema.parse({
                eventId: req.query.eventId,
                status: req.query.status,
                category: req.query.category,
                search: req.query.search,
                sortBy: req.query.sortBy,
            });
            const vendors = await vendor_service_1.default.findAll(filters);
            res.json({
                success: true,
                data: {
                    vendors,
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
            console.error('Error fetching vendors:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao buscar fornecedores',
                },
            });
        }
    }
    /**
     * GET /vendors/stats
     * Obter estatísticas dos fornecedores
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
            const stats = await vendor_service_1.default.getStats(eventId);
            res.json({
                success: true,
                data: {
                    stats,
                },
            });
        }
        catch (error) {
            console.error('Error fetching vendor stats:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao buscar estatísticas',
                },
            });
        }
    }
    /**
     * GET /vendors/:id
     * Buscar fornecedor por ID
     */
    async getById(req, res) {
        try {
            const id = req.params.id;
            const vendor = await vendor_service_1.default.findById(id);
            if (!vendor) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: 'Fornecedor não encontrado',
                    },
                });
            }
            res.json({
                success: true,
                data: {
                    vendor,
                },
            });
        }
        catch (error) {
            console.error('Error fetching vendor:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao buscar fornecedor',
                },
            });
        }
    }
    /**
     * PUT /vendors/:id
     * Atualizar fornecedor
     */
    async update(req, res) {
        try {
            const id = req.params.id;
            const validatedData = vendor_schema_1.UpdateVendorSchema.parse(req.body);
            const vendor = await vendor_service_1.default.update(id, validatedData);
            res.json({
                success: true,
                data: {
                    vendor,
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
            console.error('Error updating vendor:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao atualizar fornecedor',
                },
            });
        }
    }
    /**
     * PATCH /vendors/:id/mark-paid
     * Marcar fornecedor como pago
     */
    async markAsPaid(req, res) {
        try {
            const id = req.params.id;
            const vendor = await vendor_service_1.default.markAsPaid(id);
            res.json({
                success: true,
                data: {
                    vendor,
                },
            });
        }
        catch (error) {
            console.error('Error marking vendor as paid:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao marcar fornecedor como pago',
                },
            });
        }
    }
    /**
     * PATCH /vendors/:id/mark-overdue
     * Marcar fornecedor como atrasado
     */
    async markAsOverdue(req, res) {
        try {
            const id = req.params.id;
            const vendor = await vendor_service_1.default.markAsOverdue(id);
            res.json({
                success: true,
                data: {
                    vendor,
                },
            });
        }
        catch (error) {
            console.error('Error marking vendor as overdue:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao marcar fornecedor como atrasado',
                },
            });
        }
    }
    /**
     * DELETE /vendors/:id
     * Deletar fornecedor
     */
    async delete(req, res) {
        try {
            const id = req.params.id;
            await vendor_service_1.default.delete(id);
            res.json({
                success: true,
                data: {
                    message: 'Fornecedor deletado com sucesso',
                },
            });
        }
        catch (error) {
            console.error('Error deleting vendor:', error);
            res.status(500).json({
                success: false,
                error: {
                    message: 'Erro ao deletar fornecedor',
                },
            });
        }
    }
}
exports.VendorController = VendorController;
exports.default = new VendorController();
//# sourceMappingURL=vendor.controller.js.map