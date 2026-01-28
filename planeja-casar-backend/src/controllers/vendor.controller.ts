import { Request, Response } from 'express';
import vendorService from '../services/vendor.service';
import {
  CreateVendorSchema,
  UpdateVendorSchema,
  VendorFiltersSchema,
} from '../schemas/vendor.schema';
import { z } from 'zod';

export class VendorController {
  /**
   * POST /vendors
   * Criar novo fornecedor
   */
  async create(req: Request, res: Response) {
    try {
      const validatedData = CreateVendorSchema.parse(req.body);

      const vendor = await vendorService.create(validatedData);

      res.status(201).json({
        success: true,
        data: {
          vendor,
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
  async getAll(req: Request, res: Response) {
    try {
      const filters = VendorFiltersSchema.parse({
        eventId: req.query.eventId,
        status: req.query.status,
        category: req.query.category,
        search: req.query.search,
        sortBy: req.query.sortBy,
      });

      const vendors = await vendorService.findAll(filters);

      res.json({
        success: true,
        data: {
          vendors,
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

      const stats = await vendorService.getStats(eventId);

      res.json({
        success: true,
        data: {
          stats,
        },
      });
    } catch (error) {
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
  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const vendor = await vendorService.findById(id);

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
    } catch (error) {
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
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const validatedData = UpdateVendorSchema.parse(req.body);

      const vendor = await vendorService.update(id, validatedData);

      res.json({
        success: true,
        data: {
          vendor,
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
  async markAsPaid(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const vendor = await vendorService.markAsPaid(id);

      res.json({
        success: true,
        data: {
          vendor,
        },
      });
    } catch (error) {
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
  async markAsOverdue(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const vendor = await vendorService.markAsOverdue(id);

      res.json({
        success: true,
        data: {
          vendor,
        },
      });
    } catch (error) {
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
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      await vendorService.delete(id);

      res.json({
        success: true,
        data: {
          message: 'Fornecedor deletado com sucesso',
        },
      });
    } catch (error) {
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

export default new VendorController();
