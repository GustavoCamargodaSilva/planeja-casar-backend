import { prisma } from '../config/database';
import {
  CreateChecklistTaskInput,
  UpdateChecklistTaskInput,
  ChecklistFiltersInput,
} from '../schemas/checklist.schema';

class ChecklistService {
  /**
   * Criar nova tarefa do checklist
   */
  async create(eventId: string, data: CreateChecklistTaskInput) {
    const { title, description, category, priority, dueDate } = data;

    const task = await prisma.checklistTask.create({
      data: {
        eventId,
        title,
        description: description || null,
        category,
        priority,
        status: 'pending',
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    return task;
  }

  /**
   * Buscar todas as tarefas do checklist com filtros opcionais
   */
  async findAll(eventId: string, filters: ChecklistFiltersInput = {}) {
    const { status, category, priority, search } = filters;

    const where: any = {
      eventId,
    };

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (priority) {
      where.priority = priority;
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

    const tasks = await prisma.checklistTask.findMany({
      where,
      orderBy: [{ dueDate: 'asc' }, { createdAt: 'desc' }],
    });

    return tasks;
  }

  /**
   * Buscar tarefa por ID
   */
  async findById(taskId: string) {
    const task = await prisma.checklistTask.findUnique({
      where: { id: taskId },
    });

    return task;
  }

  /**
   * Atualizar tarefa
   */
  async update(taskId: string, data: UpdateChecklistTaskInput) {
    const { title, description, category, priority, status, dueDate } = data;

    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description || null;
    if (category !== undefined) updateData.category = category;
    if (priority !== undefined) updateData.priority = priority;
    if (status !== undefined) updateData.status = status;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;

    const task = await prisma.checklistTask.update({
      where: { id: taskId },
      data: updateData,
    });

    return task;
  }

  /**
   * Alternar status entre pending e completed
   */
  async toggleStatus(taskId: string) {
    const task = await prisma.checklistTask.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    const updatedTask = await prisma.checklistTask.update({
      where: { id: taskId },
      data: { status: newStatus },
    });

    return updatedTask;
  }

  /**
   * Deletar tarefa
   */
  async delete(taskId: string) {
    await prisma.checklistTask.delete({
      where: { id: taskId },
    });
  }

  /**
   * Obter estatísticas do checklist
   */
  async getStats(eventId: string) {
    const tasks = await prisma.checklistTask.findMany({
      where: { eventId },
    });

    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === 'completed').length;
    const pending = tasks.filter((task) => task.status === 'pending').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      percentage,
    };
  }
}

export const checklistService = new ChecklistService();
