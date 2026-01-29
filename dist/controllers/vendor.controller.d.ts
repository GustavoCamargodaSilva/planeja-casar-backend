import { Request, Response } from 'express';
export declare class VendorController {
    /**
     * POST /vendors
     * Criar novo fornecedor
     */
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /vendors
     * Listar fornecedores com filtros
     */
    getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /vendors/stats
     * Obter estatísticas dos fornecedores
     */
    getStats(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /vendors/:id
     * Buscar fornecedor por ID
     */
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * PUT /vendors/:id
     * Atualizar fornecedor
     */
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * PATCH /vendors/:id/mark-paid
     * Marcar fornecedor como pago
     */
    markAsPaid(req: Request, res: Response): Promise<void>;
    /**
     * PATCH /vendors/:id/mark-overdue
     * Marcar fornecedor como atrasado
     */
    markAsOverdue(req: Request, res: Response): Promise<void>;
    /**
     * DELETE /vendors/:id
     * Deletar fornecedor
     */
    delete(req: Request, res: Response): Promise<void>;
}
declare const _default: VendorController;
export default _default;
