export declare class DashboardService {
    /**
     * Get KPIs (Key Performance Indicators) for the dashboard
     * - Days until wedding
     * - Budget used vs total
     * - Guests confirmed vs total
     * - Pending tasks
     */
    getKPIs(eventId: string): Promise<{
        daysUntilWedding: number;
        budgetUsed: number;
        budgetTotal: number;
        totalGuests: number;
        confirmedGuests: number;
        pendingTasks: number;
    }>;
    /**
     * Get upcoming tasks ordered by due date
     */
    getUpcomingTasks(eventId: string, limit?: number): Promise<{
        id: string;
        title: string;
        category: string;
        priority: string;
        dueDate: Date | null;
    }[]>;
    /**
     * Get progress by checklist category
     */
    getProgressByArea(eventId: string): Promise<{
        category: string;
        total: number;
        completed: number;
        percentage: number;
    }[]>;
    /**
     * Get vendors status count
     */
    getVendorsStatus(eventId: string): Promise<{
        paid: number;
        pending: number;
        overdue: number;
        total: number;
    }>;
    /**
     * Get budget snapshot by category
     */
    getBudgetSnapshot(eventId: string): Promise<{
        byCategory: {
            category: string;
            total: number;
        }[];
        total: number;
    }>;
}
declare const _default: DashboardService;
export default _default;
