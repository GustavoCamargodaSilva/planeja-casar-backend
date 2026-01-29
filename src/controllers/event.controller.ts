/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';
import eventService from '../services/event.service';
import {
  CreateEventSchema,
  UpdateEventSchema,
  JoinEventSchema,
} from '../schemas/event.schema';
import { ZodError } from 'zod';

export class EventController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = CreateEventSchema.parse(req.body);
      const userId = req.userId!;

      const event = await eventService.create(userId, validatedData);

      res.status(201).json({
        success: true,
        data: {
          event,
          message: 'Evento criado com sucesso',
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

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;

      const events = await eventService.findByUser(userId);

      res.json({
        success: true,
        data: { events },
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = req.userId!;

      const event = await eventService.findById(id, userId);

      res.json({
        success: true,
        data: { event },
      });
    } catch (error) {
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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = req.userId!;
      const validatedData = UpdateEventSchema.parse(req.body);

      const event = await eventService.update(id, userId, validatedData);

      res.json({
        success: true,
        data: {
          event,
          message: 'Evento atualizado com sucesso',
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

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = req.userId!;

      const result = await eventService.delete(id, userId);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
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

  async join(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;
      const validatedData = JoinEventSchema.parse(req.body);

      const event = await eventService.joinByCode(userId, validatedData);

      res.status(200).json({
        success: true,
        data: {
          event,
          message: 'Você entrou no evento com sucesso',
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

export const eventController = new EventController();
