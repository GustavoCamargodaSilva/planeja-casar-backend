import { Request, Response, NextFunction } from 'express';
export declare class ChecklistController {
    /**
     * POST /checklist
     * Criar nova tarefa do checklist
     */
    create(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /checklist
     * Listar todas as tarefas do checklist com filtros opcionais
     */
    findAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /checklist/stats
     * Obter estatísticas do checklist
     */
    getStats(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /checklist/:id
     * Buscar tarefa por ID
     */
    findById(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * PUT /checklist/:id
     * Atualizar tarefa
     */
    update(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * PATCH /checklist/:id/toggle
     * Alternar status da tarefa entre pending e completed
     */
    toggleStatus(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * DELETE /checklist/:id
     * Deletar tarefa
     */
    delete(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare const checklistController: ChecklistController;
