import { prisma } from '../config/database';
import { CreateEventInput, UpdateEventInput, JoinEventInput } from '../schemas/event.schema';
import { Decimal } from '@prisma/client/runtime/library';

class EventService {
  async create(userId: string, data: CreateEventInput) {
    const { eventType, date, venue, budget } = data;

    // Criar evento
    const event = await prisma.event.create({
      data: {
        eventType,
        date: new Date(date),
        venue,
        budget: budget ? new Decimal(budget) : null,
        ownerId: userId,
      },
    });

    // Adicionar owner como member com role 'owner'
    await prisma.eventMember.create({
      data: {
        eventId: event.id,
        userId,
        role: 'owner',
      },
    });

    return event;
  }

  async findByUser(userId: string) {
    // Buscar todos os eventos onde o usuário é membro
    const eventMembers = await prisma.eventMember.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return eventMembers.map((em: any) => ({
      ...em.event,
      userRole: em.role,
    }));
  }

  async findById(eventId: string, userId: string) {
    // Verificar se usuário tem acesso ao evento
    const eventMember = await prisma.eventMember.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });

    if (!eventMember) {
      throw new Error('FORBIDDEN');
    }

    // Buscar evento com informações completas
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!event) {
      throw new Error('EVENT_NOT_FOUND');
    }

    return {
      ...event,
      userRole: eventMember.role,
    };
  }

  async update(eventId: string, userId: string, data: UpdateEventInput) {
    // Verificar se usuário é owner do evento
    const eventMember = await prisma.eventMember.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });

    if (!eventMember || eventMember.role !== 'owner') {
      throw new Error('FORBIDDEN');
    }

    // Preparar dados para atualização
    const updateData: any = {};

    if (data.eventType) updateData.eventType = data.eventType;
    if (data.date) updateData.date = new Date(data.date);
    if (data.venue !== undefined) updateData.venue = data.venue;
    if (data.status) updateData.status = data.status;
    if (data.budget !== undefined) {
      updateData.budget = data.budget ? new Decimal(data.budget) : null;
    }

    const event = await prisma.event.update({
      where: { id: eventId },
      data: updateData,
    });

    return event;
  }

  async delete(eventId: string, userId: string) {
    // Verificar se usuário é owner do evento
    const eventMember = await prisma.eventMember.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });

    if (!eventMember || eventMember.role !== 'owner') {
      throw new Error('FORBIDDEN');
    }

    // Deletar evento (cascade vai deletar members e outros dados relacionados)
    await prisma.event.delete({
      where: { id: eventId },
    });

    return { message: 'Evento deletado com sucesso' };
  }

  async joinByCode(userId: string, data: JoinEventInput) {
    const { inviteCode } = data;

    // Buscar evento pelo código de convite
    const event = await prisma.event.findUnique({
      where: { inviteCode },
    });

    if (!event) {
      throw new Error('INVALID_INVITE_CODE');
    }

    // Verificar se usuário já é membro
    const existingMember = await prisma.eventMember.findUnique({
      where: {
        eventId_userId: {
          eventId: event.id,
          userId,
        },
      },
    });

    if (existingMember) {
      throw new Error('ALREADY_MEMBER');
    }

    // Adicionar usuário como member
    await prisma.eventMember.create({
      data: {
        eventId: event.id,
        userId,
        role: 'member',
      },
    });

    return event;
  }

  async calculateProgress(eventId: string) {
    // Buscar todas as tarefas do checklist
    const tasks = await prisma.checklistTask.findMany({
      where: { eventId },
    });

    if (tasks.length === 0) {
      return 0;
    }

    const completedTasks = tasks.filter((task: any) => task.status === 'completed').length;
    const progress = Math.round((completedTasks / tasks.length) * 100);

    // Atualizar progresso no evento
    await prisma.event.update({
      where: { id: eventId },
      data: { overallProgress: progress },
    });

    return progress;
  }
}

export default new EventService();
