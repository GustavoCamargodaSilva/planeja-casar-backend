// src/controllers/dashboard.controller.ts
import { Request, Response } from 'express';
import dashboardService from '../services/dashboard.service';

export class DashboardController {
  /**
   * GET /api/dashboard/kpis
   * Get KPIs for the dashboard
   */
  async getKPIs(req: Request, res: Response) {
    try {
      const { eventId } = req.query;

      if (!eventId || typeof eventId !== 'string') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_EVENT_ID',
            message: 'Event ID é obrigatório',
          },
        });
      }

      const kpis = await dashboardService.getKPIs(eventId);

      return res.status(200).json({
        success: true,
        data: { kpis },
      });
    } catch (error: any) {
      console.error('Error getting KPIs:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error.message || 'Erro ao buscar KPIs',
        },
      });
    }
  }

  /**
   * GET /api/dashboard/upcoming-tasks
   * Get upcoming tasks
   */
  async getUpcomingTasks(req: Request, res: Response) {
    try {
      const { eventId, limit } = req.query;

      if (!eventId || typeof eventId !== 'string') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_EVENT_ID',
            message: 'Event ID é obrigatório',
          },
        });
      }

      const limitNum = limit ? parseInt(limit as string, 10) : 5;

      const tasks = await dashboardService.getUpcomingTasks(eventId, limitNum);

      return res.status(200).json({
        success: true,
        data: { tasks },
      });
    } catch (error: any) {
      console.error('Error getting upcoming tasks:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error.message || 'Erro ao buscar tarefas',
        },
      });
    }
  }

  /**
   * GET /api/dashboard/progress-by-area
   * Get progress by checklist category
   */
  async getProgressByArea(req: Request, res: Response) {
    try {
      const { eventId } = req.query;

      if (!eventId || typeof eventId !== 'string') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_EVENT_ID',
            message: 'Event ID é obrigatório',
          },
        });
      }

      const progress = await dashboardService.getProgressByArea(eventId);

      return res.status(200).json({
        success: true,
        data: { progress },
      });
    } catch (error: any) {
      console.error('Error getting progress by area:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error.message || 'Erro ao buscar progresso',
        },
      });
    }
  }

  /**
   * GET /api/dashboard/vendors-status
   * Get vendors status count
   */
  async getVendorsStatus(req: Request, res: Response) {
    try {
      const { eventId } = req.query;

      if (!eventId || typeof eventId !== 'string') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_EVENT_ID',
            message: 'Event ID é obrigatório',
          },
        });
      }

      const vendorsStatus = await dashboardService.getVendorsStatus(eventId);

      return res.status(200).json({
        success: true,
        data: { vendorsStatus },
      });
    } catch (error: any) {
      console.error('Error getting vendors status:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error.message || 'Erro ao buscar status de fornecedores',
        },
      });
    }
  }

  /**
   * GET /api/dashboard/budget-snapshot
   * Get budget snapshot by category
   */
  async getBudgetSnapshot(req: Request, res: Response) {
    try {
      const { eventId } = req.query;

      if (!eventId || typeof eventId !== 'string') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_EVENT_ID',
            message: 'Event ID é obrigatório',
          },
        });
      }

      const budgetSnapshot = await dashboardService.getBudgetSnapshot(eventId);

      return res.status(200).json({
        success: true,
        data: { budgetSnapshot },
      });
    } catch (error: any) {
      console.error('Error getting budget snapshot:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error.message || 'Erro ao buscar resumo de orçamento',
        },
      });
    }
  }
}

export default new DashboardController();
