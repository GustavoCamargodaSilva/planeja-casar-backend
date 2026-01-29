import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { timelineService } from '../services/timeline.service';
import {
  CreateTimelineTaskSchema,
  UpdateTimelineTaskSchema,
  TimelineFiltersSchema,
} from '../schemas/timeline.schema';

export class TimelineController {
  /**
   * POST /timeline
   * Criar nova tarefa do cronograma
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = CreateTimelineTaskSchema.parse(req.body);
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

      const task = await timelineService.create(eventId, validatedData);

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
   * GET /timeline
   * Listar todas as tarefas do cronograma com filtros opcionais
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

      const filters = TimelineFiltersSchema.parse({
        status: req.query.status,
        search: req.query.search,
      });

      const tasks = await timelineService.findAll(eventId, filters);

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
   * GET /timeline/stats
   * Obter estatísticas do cronograma
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

      const stats = await timelineService.getStats(eventId);

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
   * GET /timeline/:id
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

      const task = await timelineService.findById(id);

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
   * PUT /timeline/:id
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

      const validatedData = UpdateTimelineTaskSchema.parse(req.body);

      const task = await timelineService.update(id, validatedData);

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
   * DELETE /timeline/:id
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

      await timelineService.delete(id);

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

export const timelineController = new TimelineController();
