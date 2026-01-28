// src/controllers/idea.controller.ts
import { Request, Response } from 'express';
import ideaService from '../services/idea.service';
import { CreateIdeaSchema, UpdateIdeaSchema, IdeaFiltersSchema } from '../schemas/idea.schema';
import { ZodError } from 'zod';

export class IdeaController {
  /**
   * POST /api/ideas
   * Criar nova ideia
   */
  async create(req: Request, res: Response) {
    try {
      const validatedData = CreateIdeaSchema.parse(req.body);
      const idea = await ideaService.create(validatedData);

      return res.status(201).json({
        success: true,
        data: { idea },
      });
    } catch (error) {
      if (error instanceof ZodError) {
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
  async findAll(req: Request, res: Response) {
    try {
      const validatedFilters = IdeaFiltersSchema.parse(req.query);
      const ideas = await ideaService.findAll(validatedFilters);

      return res.status(200).json({
        success: true,
        data: { ideas },
      });
    } catch (error) {
      if (error instanceof ZodError) {
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
  async getStats(req: Request, res: Response) {
    try {
      const eventId = req.query.eventId as string;

      if (!eventId) {
        return res.status(400).json({
          success: false,
          error: 'eventId é obrigatório',
        });
      }

      const stats = await ideaService.getStats(eventId);

      return res.status(200).json({
        success: true,
        data: { stats },
      });
    } catch (error) {
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
  async findById(req: Request, res: Response) {
    try {
      const ideaId = req.params.id as string;
      const idea = await ideaService.findById(ideaId);

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
    } catch (error) {
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
  async update(req: Request, res: Response) {
    try {
      const ideaId = req.params.id as string;
      const validatedData = UpdateIdeaSchema.parse(req.body);

      const idea = await ideaService.update(ideaId, validatedData);

      return res.status(200).json({
        success: true,
        data: { idea },
      });
    } catch (error) {
      if (error instanceof ZodError) {
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
  async toggleFavorite(req: Request, res: Response) {
    try {
      const ideaId = req.params.id as string;
      const idea = await ideaService.toggleFavorite(ideaId);

      return res.status(200).json({
        success: true,
        data: { idea },
      });
    } catch (error: any) {
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
  async delete(req: Request, res: Response) {
    try {
      const ideaId = req.params.id as string;
      await ideaService.delete(ideaId);

      return res.status(200).json({
        success: true,
        data: { message: 'Ideia deletada com sucesso' },
      });
    } catch (error) {
      console.error('Erro ao deletar ideia:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao deletar ideia',
      });
    }
  }
}

export default new IdeaController();
