import { Request, Response } from 'express';
export declare class DashboardController {
    /**
     * GET /api/dashboard/kpis
     * Get KPIs for the dashboard
     */
    getKPIs(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/dashboard/upcoming-tasks
     * Get upcoming tasks
     */
    getUpcomingTasks(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/dashboard/progress-by-area
     * Get progress by checklist category
     */
    getProgressByArea(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/dashboard/vendors-status
     * Get vendors status count
     */
    getVendorsStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/dashboard/budget-snapshot
     * Get budget snapshot by category
     */
    getBudgetSnapshot(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: DashboardController;
export default _default;
