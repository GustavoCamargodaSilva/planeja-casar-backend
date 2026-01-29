import { z } from 'zod';

/**
 * Schema para criação de tarefa do cronograma
 */
export const CreateTimelineTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  date: z.string(), // ISO date string
  time: z.string().optional(), // HH:MM format
});

/**
 * Schema para atualização de tarefa do cronograma
 */
export const UpdateTimelineTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').optional(),
  description: z.string().optional(),
  date: z.string().optional(), // ISO date string
  time: z.string().optional(), // HH:MM format
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
});

/**
 * Schema para filtros de busca do cronograma
 */
export const TimelineFiltersSchema = z.object({
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
  search: z.string().optional(),
});

/**
 * Tipos TypeScript derivados dos schemas
 */
export type CreateTimelineTaskInput = z.infer<typeof CreateTimelineTaskSchema>;
export type UpdateTimelineTaskInput = z.infer<typeof UpdateTimelineTaskSchema>;
export type TimelineFiltersInput = z.infer<typeof TimelineFiltersSchema>;
