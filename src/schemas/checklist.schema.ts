import { z } from 'zod';

/**
 * Schema para criação de tarefa do checklist
 */
export const CreateChecklistTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  category: z
    .enum(['venue', 'catering', 'decoration', 'photography', 'music', 'attire', 'invitations', 'other'])
    .default('other'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.string().optional(), // ISO date string
});

/**
 * Schema para atualização de tarefa do checklist
 */
export const UpdateChecklistTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').optional(),
  description: z.string().optional(),
  category: z
    .enum(['venue', 'catering', 'decoration', 'photography', 'music', 'attire', 'invitations', 'other'])
    .optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['pending', 'completed']).optional(),
  dueDate: z.string().optional(), // ISO date string
});

/**
 * Schema para filtros de busca do checklist
 */
export const ChecklistFiltersSchema = z.object({
  status: z.enum(['pending', 'completed']).optional(),
  category: z
    .enum(['venue', 'catering', 'decoration', 'photography', 'music', 'attire', 'invitations', 'other'])
    .optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  search: z.string().optional(),
});

/**
 * Tipos TypeScript derivados dos schemas
 */
export type CreateChecklistTaskInput = z.infer<typeof CreateChecklistTaskSchema>;
export type UpdateChecklistTaskInput = z.infer<typeof UpdateChecklistTaskSchema>;
export type ChecklistFiltersInput = z.infer<typeof ChecklistFiltersSchema>;
