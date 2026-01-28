import { z } from 'zod';

export const CreateEventSchema = z.object({
  eventType: z.string().min(1, 'Tipo de evento é obrigatório').default('Casamento'),
  date: z.string().datetime('Data inválida'),
  venue: z.string().optional(),
  budget: z.number().positive('Orçamento deve ser positivo').optional(),
});

export const UpdateEventSchema = z.object({
  eventType: z.string().min(1, 'Tipo de evento é obrigatório').optional(),
  date: z.string().datetime('Data inválida').optional(),
  venue: z.string().optional(),
  status: z.enum(['Em andamento', 'Concluído', 'Cancelado']).optional(),
  budget: z.number().positive('Orçamento deve ser positivo').optional(),
});

export const JoinEventSchema = z.object({
  inviteCode: z.string().uuid('Código de convite inválido'),
});

export type CreateEventInput = z.infer<typeof CreateEventSchema>;
export type UpdateEventInput = z.infer<typeof UpdateEventSchema>;
export type JoinEventInput = z.infer<typeof JoinEventSchema>;
