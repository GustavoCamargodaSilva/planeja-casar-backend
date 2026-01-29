// src/schemas/idea.schema.ts
import { z } from 'zod';

// Categorias permitidas para ideias
const ideaCategories = [
  'Decoracao',
  'Vestuario',
  'Convites',
  'Buffet',
  'Flores',
  'Local',
  'Fotografia',
  'DJ',
  'Bolo',
  'Lembrancinhas',
  'Outro',
] as const;

// Schema para criar uma nova ideia
export const CreateIdeaSchema = z.object({
  eventId: z.string().uuid('ID do evento inválido'),
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  description: z.string().max(1000, 'Descrição muito longa').optional(),
  category: z.enum(ideaCategories),
  imageUrl: z.string().url('URL da imagem inválida').optional().or(z.literal('')),
  sourceUrl: z.string().url('URL da fonte inválida').optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
});

// Schema para atualizar uma ideia
export const UpdateIdeaSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo').optional(),
  description: z.string().max(1000, 'Descrição muito longa').optional().or(z.literal('')),
  category: z.enum(ideaCategories).optional(),
  imageUrl: z.string().url('URL da imagem inválida').optional().or(z.literal('')),
  sourceUrl: z.string().url('URL da fonte inválida').optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  isFavorite: z.boolean().optional(),
});

// Schema para filtros de ideias
export const IdeaFiltersSchema = z.object({
  eventId: z.string().uuid('ID do evento inválido'),
  category: z.enum([...ideaCategories, 'all']).optional(),
  isFavorite: z.enum(['true', 'false', 'all']).optional(),
  search: z.string().optional(),
  tags: z.string().optional(), // Comma-separated tags
});

// Tipos TypeScript derivados dos schemas
export type CreateIdeaInput = z.infer<typeof CreateIdeaSchema>;
export type UpdateIdeaInput = z.infer<typeof UpdateIdeaSchema>;
export type IdeaFilters = z.infer<typeof IdeaFiltersSchema>;
