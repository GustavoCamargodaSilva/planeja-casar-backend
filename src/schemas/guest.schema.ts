import { z } from 'zod';

// Criar convidado
export const CreateGuestSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  type: z.enum(['adult', 'child']).default('adult'),
  side: z.enum(['groom', 'bride', 'groom-family', 'bride-family', 'friends']).default('friends'),
  status: z.enum(['pending', 'confirmed', 'declined']).default('pending'),
  tableNumber: z.number().int().positive().optional(),
  dietaryNotes: z.string().optional(),
  notes: z.string().optional(),
});

// Atualizar convidado
export const UpdateGuestSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  type: z.enum(['adult', 'child']).optional(),
  side: z.enum(['groom', 'bride', 'groom-family', 'bride-family', 'friends']).optional(),
  status: z.enum(['pending', 'confirmed', 'declined']).optional(),
  tableNumber: z.number().int().positive().optional(),
  dietaryNotes: z.string().optional(),
  notes: z.string().optional(),
});

// Filtros de convidados
export const GuestFiltersSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'declined']).optional(),
  type: z.enum(['adult', 'child']).optional(),
  side: z.enum(['groom', 'bride', 'groom-family', 'bride-family', 'friends']).optional(),
  search: z.string().optional(),
});

// Tipos TypeScript
export type CreateGuestInput = z.infer<typeof CreateGuestSchema>;
export type UpdateGuestInput = z.infer<typeof UpdateGuestSchema>;
export type GuestFiltersInput = z.infer<typeof GuestFiltersSchema>;
