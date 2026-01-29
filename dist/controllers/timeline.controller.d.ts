import { Request, Response, NextFunction } from 'express';
export declare class TimelineController {
    /**
     * POST /timeline
     * Criar nova tarefa do cronograma
     */
    create(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /timeline
     * Listar todas as tarefas do cronograma com filtros opcionais
     */
    findAll(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /timeline/stats
     * Obter estatísticas do cronograma
     */
    getStats(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * GET /timeline/:id
     * Buscar tarefa por ID
     */
    findById(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * PUT /timeline/:id
     * Atualizar tarefa
     */
    update(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * DELETE /timeline/:id
     * Deletar tarefa
     */
    delete(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare const timelineController: TimelineController;
