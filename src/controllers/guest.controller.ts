/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import guestService from '../services/guest.service';
import { CreateGuestSchema, UpdateGuestSchema, GuestFiltersSchema } from '../schemas/guest.schema';

export class GuestController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = CreateGuestSchema.parse(req.body);
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

      const guest = await guestService.create(eventId, validatedData);

      res.status(201).json({
        success: true,
        data: {
          guest,
          message: 'Convidado criado com sucesso',
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

      const filters = GuestFiltersSchema.parse({
        status: req.query.status,
        type: req.query.type,
        side: req.query.side,
        search: req.query.search,
      });

      const guests = await guestService.findAll(eventId, filters);

      res.json({
        success: true,
        data: { guests },
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

      const stats = await guestService.getStats(eventId);

      res.json({
        success: true,
        data: { stats },
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const guest = await guestService.findById(id);

      res.json({
        success: true,
        data: { guest },
      });
    } catch (error) {
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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const validatedData = UpdateGuestSchema.parse(req.body);

      const guest = await guestService.update(id, validatedData);

      res.json({
        success: true,
        data: {
          guest,
          message: 'Convidado atualizado com sucesso',
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

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await guestService.delete(id);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
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

export const guestController = new GuestController();
