import { prisma } from '../config/database';
import { CreateVendorInput, UpdateVendorInput, VendorFiltersInput } from '../schemas/vendor.schema';

export class VendorService {
  /**
   * Criar novo fornecedor
   */
  async create(data: CreateVendorInput) {
    const vendor = await prisma.vendor.create({
      data: {
        eventId: data.eventId,
        name: data.name,
        category: data.category,
        contact: data.contact,
        phone: data.phone,
        email: data.email,
        value: data.value,
        notes: data.notes,
        rating: data.rating,
      },
    });

    return vendor;
  }

  /**
   * Buscar todos os fornecedores com filtros e ordenação
   */
  async findAll(filters: VendorFiltersInput) {
    const { eventId, status, category, search, sortBy } = filters;

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
        { name: { contains: search, mode: 'insensitive' } },
        { contact: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Definir ordenação
    let orderBy: any = { createdAt: 'desc' };
    if (sortBy) {
      orderBy = { [sortBy]: 'asc' };
    }

    const vendors = await prisma.vendor.findMany({
      where,
      orderBy,
    });

    return vendors;
  }

  /**
   * Buscar fornecedor por ID
   */
  async findById(vendorId: string) {
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    return vendor;
  }

  /**
   * Atualizar fornecedor
   */
  async update(vendorId: string, data: UpdateVendorInput) {
    const updateData: any = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.contact !== undefined) updateData.contact = data.contact;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.value !== undefined) updateData.value = data.value;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.rating !== undefined) updateData.rating = data.rating;

    const vendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: updateData,
    });

    return vendor;
  }

  /**
   * Deletar fornecedor
   */
  async delete(vendorId: string) {
    await prisma.vendor.delete({
      where: { id: vendorId },
    });
  }

  /**
   * Marcar fornecedor como pago
   */
  async markAsPaid(vendorId: string) {
    const vendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: { status: 'paid' },
    });

    return vendor;
  }

  /**
   * Marcar fornecedor como atrasado
   */
  async markAsOverdue(vendorId: string) {
    const vendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: { status: 'overdue' },
    });

    return vendor;
  }

  /**
   * Obter estatísticas dos fornecedores
   */
  async getStats(eventId: string) {
    // Total de fornecedores
    const total = await prisma.vendor.count({
      where: { eventId },
    });

    // Fornecedores por status
    const paid = await prisma.vendor.count({
      where: { eventId, status: 'paid' },
    });

    const pending = await prisma.vendor.count({
      where: { eventId, status: 'pending' },
    });

    const overdue = await prisma.vendor.count({
      where: { eventId, status: 'overdue' },
    });

    // Valor total de todos os fornecedores
    const totalValue = await prisma.vendor.aggregate({
      where: { eventId },
      _sum: {
        value: true,
      },
    });

    // Valor total dos fornecedores pagos
    const paidValue = await prisma.vendor.aggregate({
      where: { eventId, status: 'paid' },
      _sum: {
        value: true,
      },
    });

    // Valor total dos fornecedores pendentes
    const pendingValue = await prisma.vendor.aggregate({
      where: { eventId, status: 'pending' },
      _sum: {
        value: true,
      },
    });

    // Fornecedores por categoria
    const byCategory = await prisma.vendor.groupBy({
      by: ['category'],
      where: { eventId },
      _count: {
        id: true,
      },
    });

    // Rating médio
    const avgRating = await prisma.vendor.aggregate({
      where: { eventId, rating: { not: null } },
      _avg: {
        rating: true,
      },
    });

    return {
      total,
      paid,
      pending,
      overdue,
      totalValue: totalValue._sum.value || 0,
      paidValue: paidValue._sum.value || 0,
      pendingValue: pendingValue._sum.value || 0,
      avgRating: avgRating._avg.rating || 0,
      byCategory: byCategory.map((cat: any) => ({
        category: cat.category,
        count: cat._count.id,
      })),
    };
  }
}

export default new VendorService();
