"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaController = void 0;
const idea_service_1 = __importDefault(require("../services/idea.service"));
const idea_schema_1 = require("../schemas/idea.schema");
const zod_1 = require("zod");
class IdeaController {
    /**
     * POST /api/ideas
     * Criar nova ideia
     */
    async create(req, res) {
        try {
            const validatedData = idea_schema_1.CreateIdeaSchema.parse(req.body);
            const idea = await idea_service_1.default.create(validatedData);
            return res.status(201).json({
                success: true,
                data: { idea },
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: 'Dados inválidos',
                    details: error.issues,
                });
            }
            console.error('Erro ao criar ideia:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro ao criar ideia',
            });
        }
    }
    /**
     * GET /api/ideas
     * Listar ideias com filtros
     */
    async findAll(req, res) {
        try {
            const validatedFilters = idea_schema_1.IdeaFiltersSchema.parse(req.query);
            const ideas = await idea_service_1.default.findAll(validatedFilters);
            return res.status(200).json({
                success: true,
                data: { ideas },
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: 'Filtros inválidos',
                    details: error.issues,
                });
            }
            console.error('Erro ao listar ideias:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro ao listar ideias',
            });
        }
    }
    /**
     * GET /api/ideas/stats
     * Obter estatísticas das ideias
     */
    async getStats(req, res) {
        try {
            const eventId = req.query.eventId;
            if (!eventId) {
                return res.status(400).json({
                    success: false,
                    error: 'eventId é obrigatório',
                });
            }
            const stats = await idea_service_1.default.getStats(eventId);
            return res.status(200).json({
                success: true,
                data: { stats },
            });
        }
        catch (error) {
            console.error('Erro ao obter estatísticas:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro ao obter estatísticas',
            });
        }
    }
    /**
     * GET /api/ideas/:id
     * Buscar ideia por ID
     */
    async findById(req, res) {
        try {
            const ideaId = req.params.id;
            const idea = await idea_service_1.default.findById(ideaId);
            if (!idea) {
                return res.status(404).json({
                    success: false,
                    error: 'Ideia não encontrada',
                });
            }
            return res.status(200).json({
                success: true,
                data: { idea },
            });
        }
        catch (error) {
            console.error('Erro ao buscar ideia:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar ideia',
            });
        }
    }
    /**
     * PUT /api/ideas/:id
     * Atualizar ideia
     */
    async update(req, res) {
        try {
            const ideaId = req.params.id;
            const validatedData = idea_schema_1.UpdateIdeaSchema.parse(req.body);
            const idea = await idea_service_1.default.update(ideaId, validatedData);
            return res.status(200).json({
                success: true,
                data: { idea },
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: 'Dados inválidos',
                    details: error.issues,
                });
            }
            console.error('Erro ao atualizar ideia:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro ao atualizar ideia',
            });
        }
    }
    /**
     * PATCH /api/ideas/:id/toggle-favorite
     * Alternar status de favorito
     */
    async toggleFavorite(req, res) {
        try {
            const ideaId = req.params.id;
            const idea = await idea_service_1.default.toggleFavorite(ideaId);
            return res.status(200).json({
                success: true,
                data: { idea },
            });
        }
        catch (error) {
            if (error.message === 'Ideia não encontrada') {
                return res.status(404).json({
                    success: false,
                    error: error.message,
                });
            }
            console.error('Erro ao alternar favorito:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro ao alternar favorito',
            });
        }
    }
    /**
     * DELETE /api/ideas/:id
     * Deletar ideia
     */
    async delete(req, res) {
        try {
            const ideaId = req.params.id;
            await idea_service_1.default.delete(ideaId);
            return res.status(200).json({
                success: true,
                data: { message: 'Ideia deletada com sucesso' },
            });
        }
        catch (error) {
            console.error('Erro ao deletar ideia:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro ao deletar ideia',
            });
        }
    }
}
exports.IdeaController = IdeaController;
exports.default = new IdeaController();
//# sourceMappingURL=idea.controller.js.map