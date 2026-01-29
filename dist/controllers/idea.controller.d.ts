import { Request, Response } from 'express';
export declare class IdeaController {
    /**
     * POST /api/ideas
     * Criar nova ideia
     */
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/ideas
     * Listar ideias com filtros
     */
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/ideas/stats
     * Obter estatísticas das ideias
     */
    getStats(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/ideas/:id
     * Buscar ideia por ID
     */
    findById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * PUT /api/ideas/:id
     * Atualizar ideia
     */
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * PATCH /api/ideas/:id/toggle-favorite
     * Alternar status de favorito
     */
    toggleFavorite(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * DELETE /api/ideas/:id
     * Deletar ideia
     */
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: IdeaController;
export default _default;
