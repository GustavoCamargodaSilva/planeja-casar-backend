"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timelineService = void 0;
const database_1 = require("../config/database");
class TimelineService {
    /**
     * Criar nova tarefa do cronograma
     */
    async create(eventId, data) {
        const { title, description, date, time } = data;
        const task = await database_1.prisma.timelineTask.create({
            data: {
                eventId,
                title,
                description: description || null,
                date: new Date(date),
                time: time || null,
                status: 'pending',
            },
        });
        return task;
    }
    /**
     * Buscar todas as tarefas do cronograma com filtros opcionais
     * Ordenado por data
     */
    async findAll(eventId, filters = {}) {
        const { status, search } = filters;
        const where = {
            eventId,
        };
        if (status) {
            where.status = status;
        }
        if (search) {
            where.OR = [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ];
        }
        const tasks = await database_1.prisma.timelineTask.findMany({
            where,
            orderBy: [{ date: 'asc' }, { time: 'asc' }, { createdAt: 'asc' }],
        });
        return tasks;
    }
    /**
     * Buscar tarefa por ID
     */
    async findById(taskId) {
        const task = await database_1.prisma.timelineTask.findUnique({
            where: { id: taskId },
        });
        return task;
    }
    /**
     * Atualizar tarefa
     */
    async update(taskId, data) {
        const { title, description, date, time, status } = data;
        const updateData = {};
        if (title !== undefined)
            updateData.title = title;
        if (description !== undefined)
            updateData.description = description || null;
        if (date !== undefined)
            updateData.date = new Date(date);
        if (time !== undefined)
            updateData.time = time || null;
        if (status !== undefined)
            updateData.status = status;
        const task = await database_1.prisma.timelineTask.update({
            where: { id: taskId },
            data: updateData,
        });
        return task;
    }
    /**
     * Deletar tarefa
     */
    async delete(taskId) {
        await database_1.prisma.timelineTask.delete({
            where: { id: taskId },
        });
    }
    /**
     * Obter estatísticas do cronograma
     */
    async getStats(eventId) {
        const tasks = await database_1.prisma.timelineTask.findMany({
            where: { eventId },
        });
        // Obter evento para calcular dias até o casamento
        const event = await database_1.prisma.event.findUnique({
            where: { id: eventId },
            select: { date: true },
        });
        const total = tasks.length;
        const completed = tasks.filter((task) => task.status === 'completed').length;
        const inProgress = tasks.filter((task) => task.status === 'in_progress').length;
        const pending = tasks.filter((task) => task.status === 'pending').length;
        // Calcular dias até o casamento
        let daysUntilWedding = 0;
        if (event?.date) {
            const eventDate = new Date(event.date);
            const today = new Date();
            const diffTime = eventDate.getTime() - today.getTime();
            daysUntilWedding = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
        return {
            total,
            completed,
            inProgress,
            pending,
            daysUntilWedding,
        };
    }
}
exports.timelineService = new TimelineService();
//# sourceMappingURL=timeline.service.js.map