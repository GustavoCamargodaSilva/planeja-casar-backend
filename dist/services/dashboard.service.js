"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
// src/services/dashboard.service.ts
const database_1 = require("../config/database");
class DashboardService {
    /**
     * Get KPIs (Key Performance Indicators) for the dashboard
     * - Days until wedding
     * - Budget used vs total
     * - Guests confirmed vs total
     * - Pending tasks
     */
    async getKPIs(eventId) {
        // Get event data
        const event = await database_1.prisma.event.findUnique({
            where: { id: eventId },
            select: {
                date: true,
                budget: true,
            },
        });
        if (!event) {
            throw new Error('Evento não encontrado');
        }
        // Calculate days until wedding
        const today = new Date();
        const weddingDate = new Date(event.date);
        const diffTime = weddingDate.getTime() - today.getTime();
        const daysUntilWedding = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // Get budget data
        const budgets = await database_1.prisma.budget.findMany({
            where: {
                eventId,
                status: 'approved',
            },
            select: {
                value: true,
            },
        });
        const budgetUsed = budgets.reduce((sum, b) => sum + Number(b.value), 0);
        const budgetTotal = event.budget ? Number(event.budget) : 0;
        // Get guests data
        const totalGuests = await database_1.prisma.guest.count({
            where: { eventId },
        });
        const confirmedGuests = await database_1.prisma.guest.count({
            where: {
                eventId,
                status: 'confirmed',
            },
        });
        // Get pending tasks
        const pendingTasks = await database_1.prisma.checklistTask.count({
            where: {
                eventId,
                status: 'pending',
            },
        });
        return {
            daysUntilWedding,
            budgetUsed,
            budgetTotal,
            totalGuests,
            confirmedGuests,
            pendingTasks,
        };
    }
    /**
     * Get upcoming tasks ordered by due date
     */
    async getUpcomingTasks(eventId, limit = 5) {
        const tasks = await database_1.prisma.checklistTask.findMany({
            where: {
                eventId,
                status: 'pending',
                dueDate: {
                    not: null,
                },
            },
            orderBy: {
                dueDate: 'asc',
            },
            take: limit,
            select: {
                id: true,
                title: true,
                dueDate: true,
                priority: true,
                category: true,
            },
        });
        return tasks;
    }
    /**
     * Get progress by checklist category
     */
    async getProgressByArea(eventId) {
        // Get all tasks grouped by category
        const allTasks = await database_1.prisma.checklistTask.findMany({
            where: { eventId },
            select: {
                category: true,
                status: true,
            },
        });
        // Group by category and calculate percentage
        const categoryMap = new Map();
        allTasks.forEach((task) => {
            if (!categoryMap.has(task.category)) {
                categoryMap.set(task.category, { total: 0, completed: 0 });
            }
            const stats = categoryMap.get(task.category);
            stats.total += 1;
            if (task.status === 'completed') {
                stats.completed += 1;
            }
        });
        // Convert to array with percentage
        const progressByArea = Array.from(categoryMap.entries()).map(([category, stats]) => ({
            category,
            total: stats.total,
            completed: stats.completed,
            percentage: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
        }));
        return progressByArea;
    }
    /**
     * Get vendors status count
     */
    async getVendorsStatus(eventId) {
        const vendors = await database_1.prisma.vendor.findMany({
            where: { eventId },
            select: {
                status: true,
            },
        });
        const statusCount = {
            paid: 0,
            pending: 0,
            overdue: 0,
            total: vendors.length,
        };
        vendors.forEach((vendor) => {
            if (vendor.status === 'paid') {
                statusCount.paid += 1;
            }
            else if (vendor.status === 'pending') {
                statusCount.pending += 1;
            }
            else if (vendor.status === 'overdue') {
                statusCount.overdue += 1;
            }
        });
        return statusCount;
    }
    /**
     * Get budget snapshot by category
     */
    async getBudgetSnapshot(eventId) {
        const budgets = await database_1.prisma.budget.findMany({
            where: {
                eventId,
                status: 'approved',
            },
            select: {
                category: true,
                value: true,
            },
        });
        // Group by category
        const categoryMap = new Map();
        budgets.forEach((budget) => {
            const current = categoryMap.get(budget.category) || 0;
            categoryMap.set(budget.category, current + Number(budget.value));
        });
        // Convert to array
        const budgetByCategory = Array.from(categoryMap.entries()).map(([category, total]) => ({
            category,
            total,
        }));
        // Calculate grand total
        const grandTotal = budgetByCategory.reduce((sum, item) => sum + item.total, 0);
        return {
            byCategory: budgetByCategory,
            total: grandTotal,
        };
    }
}
exports.DashboardService = DashboardService;
exports.default = new DashboardService();
//# sourceMappingURL=dashboard.service.js.map