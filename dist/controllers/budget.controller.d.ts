import { Request, Response } from 'express';
export declare class BudgetController {
    /**
     * POST /budgets
     * Criar novo orçamento
     */
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /budgets
     * Listar orçamentos com filtros
     */
    getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /budgets/stats
     * Obter estatísticas dos orçamentos
     */
    getStats(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /budgets/:id
     * Buscar orçamento por ID
     */
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * PUT /budgets/:id
     * Atualizar orçamento
     */
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * PATCH /budgets/:id/approve
     * Aprovar orçamento
     */
    approve(req: Request, res: Response): Promise<void>;
    /**
     * PATCH /budgets/:id/reject
     * Rejeitar orçamento
     */
    reject(req: Request, res: Response): Promise<void>;
    /**
     * DELETE /budgets/:id
     * Deletar orçamento
     */
    delete(req: Request, res: Response): Promise<void>;
}
declare const _default: BudgetController;
export default _default;
