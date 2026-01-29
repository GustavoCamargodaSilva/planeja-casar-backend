import { CreateTimelineTaskInput, UpdateTimelineTaskInput, TimelineFiltersInput } from '../schemas/timeline.schema';
declare class TimelineService {
    /**
     * Criar nova tarefa do cronograma
     */
    create(eventId: string, data: CreateTimelineTaskInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        status: string;
        eventId: string;
        title: string;
        description: string | null;
        time: string | null;
    }>;
    /**
     * Buscar todas as tarefas do cronograma com filtros opcionais
     * Ordenado por data
     */
    findAll(eventId: string, filters?: TimelineFiltersInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        status: string;
        eventId: string;
        title: string;
        description: string | null;
        time: string | null;
    }[]>;
    /**
     * Buscar tarefa por ID
     */
    findById(taskId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        status: string;
        eventId: string;
        title: string;
        description: string | null;
        time: string | null;
    } | null>;
    /**
     * Atualizar tarefa
     */
    update(taskId: string, data: UpdateTimelineTaskInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        status: string;
        eventId: string;
        title: string;
        description: string | null;
        time: string | null;
    }>;
    /**
     * Deletar tarefa
     */
    delete(taskId: string): Promise<void>;
    /**
     * Obter estatísticas do cronograma
     */
    getStats(eventId: string): Promise<{
        total: number;
        completed: number;
        inProgress: number;
        pending: number;
        daysUntilWedding: number;
    }>;
}
export declare const timelineService: TimelineService;
export {};
