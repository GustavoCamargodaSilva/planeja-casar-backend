import { CreateChecklistTaskInput, UpdateChecklistTaskInput, ChecklistFiltersInput } from '../schemas/checklist.schema';
declare class ChecklistService {
    /**
     * Criar nova tarefa do checklist
     */
    create(eventId: string, data: CreateChecklistTaskInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        eventId: string;
        title: string;
        description: string | null;
        category: string;
        priority: string;
        dueDate: Date | null;
    }>;
    /**
     * Buscar todas as tarefas do checklist com filtros opcionais
     */
    findAll(eventId: string, filters?: ChecklistFiltersInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        eventId: string;
        title: string;
        description: string | null;
        category: string;
        priority: string;
        dueDate: Date | null;
    }[]>;
    /**
     * Buscar tarefa por ID
     */
    findById(taskId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        eventId: string;
        title: string;
        description: string | null;
        category: string;
        priority: string;
        dueDate: Date | null;
    } | null>;
    /**
     * Atualizar tarefa
     */
    update(taskId: string, data: UpdateChecklistTaskInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        eventId: string;
        title: string;
        description: string | null;
        category: string;
        priority: string;
        dueDate: Date | null;
    }>;
    /**
     * Alternar status entre pending e completed
     */
    toggleStatus(taskId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        eventId: string;
        title: string;
        description: string | null;
        category: string;
        priority: string;
        dueDate: Date | null;
    }>;
    /**
     * Deletar tarefa
     */
    delete(taskId: string): Promise<void>;
    /**
     * Obter estatísticas do checklist
     */
    getStats(eventId: string): Promise<{
        total: number;
        completed: number;
        pending: number;
        percentage: number;
    }>;
}
export declare const checklistService: ChecklistService;
export {};
