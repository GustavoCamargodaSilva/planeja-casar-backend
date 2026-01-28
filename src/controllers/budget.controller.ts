import { Request, Response } from 'express';
import budgetService from '../services/budget.service';
import {
  CreateBudgetSchema,
  UpdateBudgetSchema,
  BudgetFiltersSchema,
} from '../schemas/budget.schema';
import { z } from 'zod';

export class BudgetController {
  /**
   * POST /budgets
   * Criar novo orçamento
   */
  async create(req: Request, res: Response) {
    try {
      const validatedData = CreateBudgetSchema.parse(req.body);

      const budget = await budgetService.create(validatedData);

      res.status(201).json({
        success: true,
        data: {
          budget,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
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
  async getAll(req: Request, res: Response) {
    try {
      const filters = BudgetFiltersSchema.parse({
        eventId: req.query.eventId,
        status: req.query.status,
        category: req.query.category,
        search: req.query.search,
      });

      const budgets = await budgetService.findAll(filters);

      res.json({
        success: true,
        data: {
          budgets,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
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
  async getStats(req: Request, res: Response) {
    try {
      const eventId = req.query.eventId as string;

      if (!eventId) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Event ID é obrigatório',
          },
        });
      }

      const stats = await budgetService.getStats(eventId);

      res.json({
        success: true,
        data: {
          stats,
        },
      });
    } catch (error) {
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
  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const budget = await budgetService.findById(id);

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
    } catch (error) {
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
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const validatedData = UpdateBudgetSchema.parse(req.body);

      const budget = await budgetService.update(id, validatedData);

      res.json({
        success: true,
        data: {
          budget,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
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
  async approve(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const budget = await budgetService.approve(id);

      res.json({
        success: true,
        data: {
          budget,
        },
      });
    } catch (error) {
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
  async reject(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const budget = await budgetService.reject(id);

      res.json({
        success: true,
        data: {
          budget,
        },
      });
    } catch (error) {
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
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      await budgetService.delete(id);

      res.json({
        success: true,
        data: {
          message: 'Orçamento deletado com sucesso',
        },
      });
    } catch (error) {
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

export default new BudgetController();
