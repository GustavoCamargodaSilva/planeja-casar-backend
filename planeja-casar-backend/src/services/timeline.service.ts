import { prisma } from '../config/database';
import {
  CreateTimelineTaskInput,
  UpdateTimelineTaskInput,
  TimelineFiltersInput,
} from '../schemas/timeline.schema';

class TimelineService {
  /**
   * Criar nova tarefa do cronograma
   */
  async create(eventId: string, data: CreateTimelineTaskInput) {
    const { title, description, date, time } = data;

    const task = await prisma.timelineTask.create({
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
  async findAll(eventId: string, filters: TimelineFiltersInput = {}) {
    const { status, search } = filters;

    const where: any = {
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

    const tasks = await prisma.timelineTask.findMany({
      where,
      orderBy: [{ date: 'asc' }, { time: 'asc' }, { createdAt: 'asc' }],
    });

    return tasks;
  }

  /**
   * Buscar tarefa por ID
   */
  async findById(taskId: string) {
    const task = await prisma.timelineTask.findUnique({
      where: { id: taskId },
    });

    return task;
  }

  /**
   * Atualizar tarefa
   */
  async update(taskId: string, data: UpdateTimelineTaskInput) {
    const { title, description, date, time, status } = data;

    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description || null;
    if (date !== undefined) updateData.date = new Date(date);
    if (time !== undefined) updateData.time = time || null;
    if (status !== undefined) updateData.status = status;

    const task = await prisma.timelineTask.update({
      where: { id: taskId },
      data: updateData,
    });

    return task;
  }

  /**
   * Deletar tarefa
   */
  async delete(taskId: string) {
    await prisma.timelineTask.delete({
      where: { id: taskId },
    });
  }

  /**
   * Obter estatísticas do cronograma
   */
  async getStats(eventId: string) {
    const tasks = await prisma.timelineTask.findMany({
      where: { eventId },
    });

    // Obter evento para calcular dias até o casamento
    const event = await prisma.event.findUnique({
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

export const timelineService = new TimelineService();
