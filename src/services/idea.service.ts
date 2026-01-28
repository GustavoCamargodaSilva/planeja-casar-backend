// src/services/idea.service.ts
import { PrismaClient } from '@prisma/client';
import { CreateIdeaInput, UpdateIdeaInput, IdeaFilters } from '../schemas/idea.schema';

const prisma = new PrismaClient();

export class IdeaService {
  /**
   * Criar nova ideia
   */
  async create(data: CreateIdeaInput) {
    return await prisma.idea.create({
      data: {
        ...data,
        imageUrl: data.imageUrl || null,
        sourceUrl: data.sourceUrl || null,
      },
    });
  }

  /**
   * Listar ideias com filtros
   */
  async findAll(filters: IdeaFilters) {
    const { eventId, category, isFavorite, search, tags } = filters;

    const where: any = {
      eventId,
    };

    // Filtro por categoria
    if (category && category !== 'all') {
      where.category = category;
    }

    // Filtro por favorito
    if (isFavorite && isFavorite !== 'all') {
      where.isFavorite = isFavorite === 'true';
    }

    // Filtro por busca (título ou descrição)
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filtro por tags
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      where.tags = {
        hasSome: tagArray,
      };
    }

    return await prisma.idea.findMany({
      where,
      orderBy: [
        { isFavorite: 'desc' }, // Favoritos primeiro
        { createdAt: 'desc' },
      ],
    });
  }

  /**
   * Buscar ideia por ID
   */
  async findById(ideaId: string) {
    return await prisma.idea.findUnique({
      where: { id: ideaId },
    });
  }

  /**
   * Atualizar ideia
   */
  async update(ideaId: string, data: UpdateIdeaInput) {
    return await prisma.idea.update({
      where: { id: ideaId },
      data: {
        ...data,
        imageUrl: data.imageUrl === '' ? null : data.imageUrl,
        sourceUrl: data.sourceUrl === '' ? null : data.sourceUrl,
        description: data.description === '' ? null : data.description,
      },
    });
  }

  /**
   * Deletar ideia
   */
  async delete(ideaId: string) {
    return await prisma.idea.delete({
      where: { id: ideaId },
    });
  }

  /**
   * Alternar status de favorito
   */
  async toggleFavorite(ideaId: string) {
    const idea = await this.findById(ideaId);
    if (!idea) {
      throw new Error('Ideia não encontrada');
    }

    return await prisma.idea.update({
      where: { id: ideaId },
      data: {
        isFavorite: !idea.isFavorite,
      },
    });
  }

  /**
   * Obter estatísticas das ideias
   */
  async getStats(eventId: string) {
    // Total de ideias
    const total = await prisma.idea.count({
      where: { eventId },
    });

    // Ideias favoritas
    const favorites = await prisma.idea.count({
      where: {
        eventId,
        isFavorite: true,
      },
    });

    // Ideias por categoria
    const byCategory = await prisma.idea.groupBy({
      by: ['category'],
      where: { eventId },
      _count: {
        category: true,
      },
      orderBy: {
        _count: {
          category: 'desc',
        },
      },
    });

    // Contar total de tags únicas
    const allIdeas = await prisma.idea.findMany({
      where: { eventId },
      select: { tags: true },
    });

    const allTags = allIdeas.flatMap(idea => idea.tags);
    const uniqueTags = new Set(allTags);

    return {
      total,
      favorites,
      totalTags: uniqueTags.size,
      byCategory: byCategory.map(item => ({
        category: item.category,
        count: item._count.category,
      })),
    };
  }
}

export default new IdeaService();
