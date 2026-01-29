import { CreateBudgetInput, UpdateBudgetInput, BudgetFiltersInput } from '../schemas/budget.schema';
export declare class BudgetService {
    /**
     * Criar novo orçamento
     */
    create(data: CreateBudgetInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal;
        status: string;
        eventId: string;
        description: string | null;
        category: string;
        notes: string | null;
        vendorName: string;
        validUntil: Date | null;
    }>;
    /**
     * Buscar todos os orçamentos com filtros
     */
    findAll(filters: BudgetFiltersInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal;
        status: string;
        eventId: string;
        description: string | null;
        category: string;
        notes: string | null;
        vendorName: string;
        validUntil: Date | null;
    }[]>;
    /**
     * Buscar orçamento por ID
     */
    findById(budgetId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal;
        status: string;
        eventId: string;
        description: string | null;
        category: string;
        notes: string | null;
        vendorName: string;
        validUntil: Date | null;
    } | null>;
    /**
     * Atualizar orçamento
     */
    update(budgetId: string, data: UpdateBudgetInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal;
        status: string;
        eventId: string;
        description: string | null;
        category: string;
        notes: string | null;
        vendorName: string;
        validUntil: Date | null;
    }>;
    /**
     * Deletar orçamento
     */
    delete(budgetId: string): Promise<void>;
    /**
     * Aprovar orçamento
     */
    approve(budgetId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal;
        status: string;
        eventId: string;
        description: string | null;
        category: string;
        notes: string | null;
        vendorName: string;
        validUntil: Date | null;
    }>;
    /**
     * Rejeitar orçamento
     */
    reject(budgetId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal;
        status: string;
        eventId: string;
        description: string | null;
        category: string;
        notes: string | null;
        vendorName: string;
        validUntil: Date | null;
    }>;
    /**
     * Obter estatísticas dos orçamentos
     */
    getStats(eventId: string): Promise<{
        total: number;
        pending: number;
        approved: number;
        rejected: number;
        totalValue: number | import("@prisma/client/runtime/library").Decimal;
        approvedValue: number | import("@prisma/client/runtime/library").Decimal;
        avgValue: number | import("@prisma/client/runtime/library").Decimal;
        byCategory: {
            category: any;
            count: any;
            totalValue: any;
        }[];
    }>;
}
declare const _default: BudgetService;
export default _default;
