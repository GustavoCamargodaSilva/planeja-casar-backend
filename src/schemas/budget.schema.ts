import { z } from 'zod';

// Categorias válidas para orçamentos
const budgetCategories = [
  'Fotografia',
  'DJ',
  'Local',
  'Buffet',
  'Decoracao',
  'Convites',
  'Flores',
  'Vestidos',
  'Bolo',
  'Lembrancinhas',
  'Transporte',
  'Outro',
] as const;

// Status válidos para orçamentos
const budgetStatuses = ['pending', 'approved', 'rejected'] as const;

// Schema para criar um novo orçamento
export const CreateBudgetSchema = z.object({
  eventId: z.string().uuid('Event ID deve ser um UUID válido'),
  vendorName: z
    .string()
    .min(2, 'Nome do fornecedor deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do fornecedor deve ter no máximo 100 caracteres'),
  category: z.enum(budgetCategories),
  description: z
    .string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional(),
  value: z
    .number()
    .positive('Valor deve ser positivo')
    .max(999999.99, 'Valor muito alto'),
  validUntil: z
    .string()
    .datetime('Data de validade deve ser uma data válida')
    .optional()
    .nullable(),
  notes: z.string().max(1000, 'Notas devem ter no máximo 1000 caracteres').optional(),
});

// Schema para atualizar um orçamento
export const UpdateBudgetSchema = z.object({
  vendorName: z
    .string()
    .min(2, 'Nome do fornecedor deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do fornecedor deve ter no máximo 100 caracteres')
    .optional(),
  category: z
    .enum(budgetCategories)
    .optional(),
  description: z
    .string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional()
    .nullable(),
  value: z
    .number()
    .positive('Valor deve ser positivo')
    .max(999999.99, 'Valor muito alto')
    .optional(),
  status: z
    .enum(budgetStatuses)
    .optional(),
  validUntil: z
    .string()
    .datetime('Data de validade deve ser uma data válida')
    .optional()
    .nullable(),
  notes: z.string().max(1000, 'Notas devem ter no máximo 1000 caracteres').optional().nullable(),
});

// Schema para filtros de orçamento
export const BudgetFiltersSchema = z.object({
  eventId: z.string().uuid('Event ID deve ser um UUID válido'),
  status: z.enum(budgetStatuses).optional(),
  category: z.enum(budgetCategories).optional(),
  search: z.string().optional(),
});

// Types exportados
export type CreateBudgetInput = z.infer<typeof CreateBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof UpdateBudgetSchema>;
export type BudgetFiltersInput = z.infer<typeof BudgetFiltersSchema>;
