"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const database_1 = require("../config/database");
class VendorService {
    /**
     * Criar novo fornecedor
     */
    async create(data) {
        const vendor = await database_1.prisma.vendor.create({
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
    async findAll(filters) {
        const { eventId, status, category, search, sortBy } = filters;
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
                { name: { contains: search, mode: 'insensitive' } },
                { contact: { contains: search, mode: 'insensitive' } },
                { notes: { contains: search, mode: 'insensitive' } },
            ];
        }
        // Definir ordenação
        let orderBy = { createdAt: 'desc' };
        if (sortBy) {
            orderBy = { [sortBy]: 'asc' };
        }
        const vendors = await database_1.prisma.vendor.findMany({
            where,
            orderBy,
        });
        return vendors;
    }
    /**
     * Buscar fornecedor por ID
     */
    async findById(vendorId) {
        const vendor = await database_1.prisma.vendor.findUnique({
            where: { id: vendorId },
        });
        return vendor;
    }
    /**
     * Atualizar fornecedor
     */
    async update(vendorId, data) {
        const updateData = {};
        if (data.name !== undefined)
            updateData.name = data.name;
        if (data.category !== undefined)
            updateData.category = data.category;
        if (data.contact !== undefined)
            updateData.contact = data.contact;
        if (data.phone !== undefined)
            updateData.phone = data.phone;
        if (data.email !== undefined)
            updateData.email = data.email;
        if (data.value !== undefined)
            updateData.value = data.value;
        if (data.status !== undefined)
            updateData.status = data.status;
        if (data.notes !== undefined)
            updateData.notes = data.notes;
        if (data.rating !== undefined)
            updateData.rating = data.rating;
        const vendor = await database_1.prisma.vendor.update({
            where: { id: vendorId },
            data: updateData,
        });
        return vendor;
    }
    /**
     * Deletar fornecedor
     */
    async delete(vendorId) {
        await database_1.prisma.vendor.delete({
            where: { id: vendorId },
        });
    }
    /**
     * Marcar fornecedor como pago
     */
    async markAsPaid(vendorId) {
        const vendor = await database_1.prisma.vendor.update({
            where: { id: vendorId },
            data: { status: 'paid' },
        });
        return vendor;
    }
    /**
     * Marcar fornecedor como atrasado
     */
    async markAsOverdue(vendorId) {
        const vendor = await database_1.prisma.vendor.update({
            where: { id: vendorId },
            data: { status: 'overdue' },
        });
        return vendor;
    }
    /**
     * Obter estatísticas dos fornecedores
     */
    async getStats(eventId) {
        // Total de fornecedores
        const total = await database_1.prisma.vendor.count({
            where: { eventId },
        });
        // Fornecedores por status
        const paid = await database_1.prisma.vendor.count({
            where: { eventId, status: 'paid' },
        });
        const pending = await database_1.prisma.vendor.count({
            where: { eventId, status: 'pending' },
        });
        const overdue = await database_1.prisma.vendor.count({
            where: { eventId, status: 'overdue' },
        });
        // Valor total de todos os fornecedores
        const totalValue = await database_1.prisma.vendor.aggregate({
            where: { eventId },
            _sum: {
                value: true,
            },
        });
        // Valor total dos fornecedores pagos
        const paidValue = await database_1.prisma.vendor.aggregate({
            where: { eventId, status: 'paid' },
            _sum: {
                value: true,
            },
        });
        // Valor total dos fornecedores pendentes
        const pendingValue = await database_1.prisma.vendor.aggregate({
            where: { eventId, status: 'pending' },
            _sum: {
                value: true,
            },
        });
        // Fornecedores por categoria
        const byCategory = await database_1.prisma.vendor.groupBy({
            by: ['category'],
            where: { eventId },
            _count: {
                id: true,
            },
        });
        // Rating médio
        const avgRating = await database_1.prisma.vendor.aggregate({
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
            byCategory: byCategory.map((cat) => ({
                category: cat.category,
                count: cat._count.id,
            })),
        };
    }
}
exports.VendorService = VendorService;
exports.default = new VendorService();
//# sourceMappingURL=vendor.service.js.map