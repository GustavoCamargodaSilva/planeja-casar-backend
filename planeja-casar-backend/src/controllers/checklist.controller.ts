import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { checklistService } from '../services/checklist.service';
import {
  CreateChecklistTaskSchema,
  UpdateChecklistTaskSchema,
  ChecklistFiltersSchema,
} from '../schemas/checklist.schema';

export class ChecklistController {
  /**
   * POST /checklist
   * Criar nova tarefa do checklist
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = CreateChecklistTaskSchema.parse(req.body);
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

      const task = await checklistService.create(eventId, validatedData);

      res.status(201).json({
        success: true,
        data: {
          task,
          message: 'Tarefa criada com sucesso',
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
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
  async findAll(req: Request, res: Response, next: NextFunction) {
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

      const filters = ChecklistFiltersSchema.parse({
        status: req.query.status,
        category: req.query.category,
        priority: req.query.priority,
        search: req.query.search,
      });

      const tasks = await checklistService.findAll(eventId, filters);

      res.json({
        success: true,
        data: {
          tasks,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
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
  async getStats(req: Request, res: Response, next: NextFunction) {
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

      const stats = await checklistService.getStats(eventId);

      res.json({
        success: true,
        data: {
          stats,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /checklist/:id
   * Buscar tarefa por ID
   */
  async findById(req: Request, res: Response, next: NextFunction) {
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

      const task = await checklistService.findById(id);

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
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /checklist/:id
   * Atualizar tarefa
   */
  async update(req: Request, res: Response, next: NextFunction) {
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

      const validatedData = UpdateChecklistTaskSchema.parse(req.body);

      const task = await checklistService.update(id, validatedData);

      res.json({
        success: true,
        data: {
          task,
          message: 'Tarefa atualizada com sucesso',
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
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
  async toggleStatus(req: Request, res: Response, next: NextFunction) {
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

      const task = await checklistService.toggleStatus(id);

      res.json({
        success: true,
        data: {
          task,
          message: 'Status da tarefa alterado com sucesso',
        },
      });
    } catch (error) {
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
  async delete(req: Request, res: Response, next: NextFunction) {
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

      await checklistService.delete(id);

      res.json({
        success: true,
        data: {
          message: 'Tarefa deletada com sucesso',
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const checklistController = new ChecklistController();
