import { prisma } from '../config/database';
import { CreateBudgetInput, UpdateBudgetInput, BudgetFiltersInput } from '../schemas/budget.schema';

export class BudgetService {
  /**
   * Criar novo orçamento
   */
  async create(data: CreateBudgetInput) {
    const budget = await prisma.budget.create({
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
  async findAll(filters: BudgetFiltersInput) {
    const { eventId, status, category, search } = filters;

    const where: any = {
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

    const budgets = await prisma.budget.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
    });

    return budgets;
  }

  /**
   * Buscar orçamento por ID
   */
  async findById(budgetId: string) {
    const budget = await prisma.budget.findUnique({
      where: { id: budgetId },
    });

    return budget;
  }

  /**
   * Atualizar orçamento
   */
  async update(budgetId: string, data: UpdateBudgetInput) {
    const updateData: any = {};

    if (data.vendorName !== undefined) updateData.vendorName = data.vendorName;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.value !== undefined) updateData.value = data.value;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.validUntil !== undefined) {
      updateData.validUntil = data.validUntil ? new Date(data.validUntil) : null;
    }
    if (data.notes !== undefined) updateData.notes = data.notes;

    const budget = await prisma.budget.update({
      where: { id: budgetId },
      data: updateData,
    });

    return budget;
  }

  /**
   * Deletar orçamento
   */
  async delete(budgetId: string) {
    await prisma.budget.delete({
      where: { id: budgetId },
    });
  }

  /**
   * Aprovar orçamento
   */
  async approve(budgetId: string) {
    const budget = await prisma.budget.update({
      where: { id: budgetId },
      data: { status: 'approved' },
    });

    return budget;
  }

  /**
   * Rejeitar orçamento
   */
  async reject(budgetId: string) {
    const budget = await prisma.budget.update({
      where: { id: budgetId },
      data: { status: 'rejected' },
    });

    return budget;
  }

  /**
   * Obter estatísticas dos orçamentos
   */
  async getStats(eventId: string) {
    // Total de orçamentos
    const total = await prisma.budget.count({
      where: { eventId },
    });

    // Orçamentos por status
    const pending = await prisma.budget.count({
      where: { eventId, status: 'pending' },
    });

    const approved = await prisma.budget.count({
      where: { eventId, status: 'approved' },
    });

    const rejected = await prisma.budget.count({
      where: { eventId, status: 'rejected' },
    });

    // Valor total de todos os orçamentos
    const totalValue = await prisma.budget.aggregate({
      where: { eventId },
      _sum: {
        value: true,
      },
    });

    // Valor total dos orçamentos aprovados
    const approvedValue = await prisma.budget.aggregate({
      where: { eventId, status: 'approved' },
      _sum: {
        value: true,
      },
    });

    // Valor médio dos orçamentos
    const avgValue = await prisma.budget.aggregate({
      where: { eventId },
      _avg: {
        value: true,
      },
    });

    // Orçamentos por categoria
    const byCategory = await prisma.budget.groupBy({
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
      byCategory: byCategory.map((cat: any) => ({
        category: cat.category,
        count: cat._count.id,
        totalValue: cat._sum.value || 0,
      })),
    };
  }
}

export default new BudgetService();
