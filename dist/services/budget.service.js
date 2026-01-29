"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetService = void 0;
const database_1 = require("../config/database");
class BudgetService {
    /**
     * Criar novo orçamento
     */
    async create(data) {
        const budget = await database_1.prisma.budget.create({
            data: {
                eventId: data.eventId,
                vendorName: data.vendorName,
                category: data.category,
                description: data.description,
                value: data.value,
                validUntil: data.validUntil ? new Date(data.validUntil) : null,
                notes: data.notes,
            },
        });
        return budget;
    }
    /**
     * Buscar todos os orçamentos com filtros
     */
    async findAll(filters) {
        const { eventId, status, category, search } = filters;
        const where = {
            eventId,
        };
        if (status) {
            where.status = status;
        }
        if (category) {
            where.category = category;
        }
        if (search) {
            where.OR = [
                { vendorName: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { notes: { contains: search, mode: 'insensitive' } },
            ];
        }
        const budgets = await database_1.prisma.budget.findMany({
            where,
            orderBy: [{ createdAt: 'desc' }],
        });
        return budgets;
    }
    /**
     * Buscar orçamento por ID
     */
    async findById(budgetId) {
        const budget = await database_1.prisma.budget.findUnique({
            where: { id: budgetId },
        });
        return budget;
    }
    /**
     * Atualizar orçamento
     */
    async update(budgetId, data) {
        const updateData = {};
        if (data.vendorName !== undefined)
            updateData.vendorName = data.vendorName;
        if (data.category !== undefined)
            updateData.category = data.category;
        if (data.description !== undefined)
            updateData.description = data.description;
        if (data.value !== undefined)
            updateData.value = data.value;
        if (data.status !== undefined)
            updateData.status = data.status;
        if (data.validUntil !== undefined) {
            updateData.validUntil = data.validUntil ? new Date(data.validUntil) : null;
        }
        if (data.notes !== undefined)
            updateData.notes = data.notes;
        const budget = await database_1.prisma.budget.update({
            where: { id: budgetId },
            data: updateData,
        });
        return budget;
    }
    /**
     * Deletar orçamento
     */
    async delete(budgetId) {
        await database_1.prisma.budget.delete({
            where: { id: budgetId },
        });
    }
    /**
     * Aprovar orçamento
     */
    async approve(budgetId) {
        const budget = await database_1.prisma.budget.update({
            where: { id: budgetId },
            data: { status: 'approved' },
        });
        return budget;
    }
    /**
     * Rejeitar orçamento
     */
    async reject(budgetId) {
        const budget = await database_1.prisma.budget.update({
            where: { id: budgetId },
            data: { status: 'rejected' },
        });
        return budget;
    }
    /**
     * Obter estatísticas dos orçamentos
     */
    async getStats(eventId) {
        // Total de orçamentos
        const total = await database_1.prisma.budget.count({
            where: { eventId },
        });
        // Orçamentos por status
        const pending = await database_1.prisma.budget.count({
            where: { eventId, status: 'pending' },
        });
        const approved = await database_1.prisma.budget.count({
            where: { eventId, status: 'approved' },
        });
        const rejected = await database_1.prisma.budget.count({
            where: { eventId, status: 'rejected' },
        });
        // Valor total de todos os orçamentos
        const totalValue = await database_1.prisma.budget.aggregate({
            where: { eventId },
            _sum: {
                value: true,
            },
        });
        // Valor total dos orçamentos aprovados
        const approvedValue = await database_1.prisma.budget.aggregate({
            where: { eventId, status: 'approved' },
            _sum: {
                value: true,
            },
        });
        // Valor médio dos orçamentos
        const avgValue = await database_1.prisma.budget.aggregate({
            where: { eventId },
            _avg: {
                value: true,
            },
        });
        // Orçamentos por categoria
        const byCategory = await database_1.prisma.budget.groupBy({
            by: ['category'],
            where: { eventId },
            _count: {
                id: true,
            },
            _sum: {
                value: true,
            },
        });
        return {
            total,
            pending,
            approved,
            rejected,
            totalValue: totalValue._sum.value || 0,
            approvedValue: approvedValue._sum.value || 0,
            avgValue: avgValue._avg.value || 0,
            byCategory: byCategory.map((cat) => ({
                category: cat.category,
                count: cat._count.id,
                totalValue: cat._sum.value || 0,
            })),
        };
    }
}
exports.BudgetService = BudgetService;
exports.default = new BudgetService();
//# sourceMappingURL=budget.service.js.map