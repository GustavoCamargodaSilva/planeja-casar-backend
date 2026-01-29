"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
class GuestService {
    async create(eventId, data) {
        const { name, email, phone, type, side, status, tableNumber, dietaryNotes, notes } = data;
        const guest = await database_1.prisma.guest.create({
            data: {
                eventId,
                name,
                email: email || null,
                phone: phone || null,
                type,
                side,
                status,
                tableNumber: tableNumber || null,
                dietaryNotes: dietaryNotes || null,
                notes: notes || null,
            },
        });
        return guest;
    }
    async findAll(eventId, filters = {}) {
        const { status, type, side, search } = filters;
        const where = { eventId };
        if (status) {
            where.status = status;
        }
        if (type) {
            where.type = type;
        }
        if (side) {
            where.side = side;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
            ];
        }
        const guests = await database_1.prisma.guest.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
        return guests;
    }
    async findById(guestId) {
        const guest = await database_1.prisma.guest.findUnique({
            where: { id: guestId },
            include: {
                event: {
                    select: {
                        id: true,
                        eventType: true,
                        date: true,
                    },
                },
            },
        });
        if (!guest) {
            throw new Error('GUEST_NOT_FOUND');
        }
        return guest;
    }
    async update(guestId, data) {
        // Verificar se existe
        await this.findById(guestId);
        const guest = await database_1.prisma.guest.update({
            where: { id: guestId },
            data: {
                ...data,
                email: data.email || null,
                phone: data.phone || null,
                tableNumber: data.tableNumber || null,
                dietaryNotes: data.dietaryNotes || null,
                notes: data.notes || null,
            },
        });
        return guest;
    }
    async delete(guestId) {
        // Verificar se existe
        await this.findById(guestId);
        await database_1.prisma.guest.delete({
            where: { id: guestId },
        });
        return { message: 'Convidado deletado com sucesso' };
    }
    async getStats(eventId) {
        const guests = await database_1.prisma.guest.findMany({
            where: { eventId },
        });
        const total = guests.length;
        const adults = guests.filter((g) => g.type === 'adult').length;
        const children = guests.filter((g) => g.type === 'child').length;
        const confirmed = guests.filter((g) => g.status === 'confirmed').length;
        const pending = guests.filter((g) => g.status === 'pending').length;
        const declined = guests.filter((g) => g.status === 'declined').length;
        return {
            total,
            adults,
            children,
            confirmed,
            pending,
            declined,
        };
    }
}
exports.default = new GuestService();
//# sourceMappingURL=guest.service.js.map