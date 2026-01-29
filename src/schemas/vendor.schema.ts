import { z } from 'zod';

// Categorias válidas para fornecedores (mesmas do orçamento)
const vendorCategories = [
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

// Status válidos para fornecedores
const vendorStatuses = ['paid', 'pending', 'overdue'] as const;

// Schema para criar um novo fornecedor
export const CreateVendorSchema = z.object({
  eventId: z.string().uuid('Event ID deve ser um UUID válido'),
  name: z
    .string()
    .min(2, 'Nome do fornecedor deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do fornecedor deve ter no máximo 100 caracteres'),
  category: z.enum(vendorCategories),
  contact: z
    .string()
    .max(100, 'Nome do contato deve ter no máximo 100 caracteres')
    .optional(),
  phone: z
    .string()
    .max(20, 'Telefone deve ter no máximo 20 caracteres')
    .optional(),
  email: z
    .string()
    .email('Email inválido')
    .optional(),
  value: z
    .number()
    .positive('Valor deve ser positivo')
    .max(999999.99, 'Valor muito alto')
    .optional()
    .nullable(),
  notes: z.string().max(1000, 'Notas devem ter no máximo 1000 caracteres').optional(),
  rating: z
    .number()
    .int('Rating deve ser um número inteiro')
    .min(1, 'Rating mínimo é 1')
    .max(5, 'Rating máximo é 5')
    .optional()
    .nullable(),
});

// Schema para atualizar um fornecedor
export const UpdateVendorSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome do fornecedor deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do fornecedor deve ter no máximo 100 caracteres')
    .optional(),
  category: z.enum(vendorCategories).optional(),
  contact: z
    .string()
    .max(100, 'Nome do contato deve ter no máximo 100 caracteres')
    .optional()
    .nullable(),
  phone: z
    .string()
    .max(20, 'Telefone deve ter no máximo 20 caracteres')
    .optional()
    .nullable(),
  email: z
    .string()
    .email('Email inválido')
    .optional()
    .nullable(),
  value: z
    .number()
    .positive('Valor deve ser positivo')
    .max(999999.99, 'Valor muito alto')
    .optional()
    .nullable(),
  status: z.enum(vendorStatuses).optional(),
  notes: z.string().max(1000, 'Notas devem ter no máximo 1000 caracteres').optional().nullable(),
  rating: z
    .number()
    .int('Rating deve ser um número inteiro')
    .min(1, 'Rating mínimo é 1')
    .max(5, 'Rating máximo é 5')
    .optional()
    .nullable(),
});

// Schema para filtros de fornecedor
export const VendorFiltersSchema = z.object({
  eventId: z.string().uuid('Event ID deve ser um UUID válido'),
  status: z.enum(vendorStatuses).optional(),
  category: z.enum(vendorCategories).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'category', 'value', 'rating', 'createdAt']).optional(),
});

// Types exportados
export type CreateVendorInput = z.infer<typeof CreateVendorSchema>;
export type UpdateVendorInput = z.infer<typeof UpdateVendorSchema>;
export type VendorFiltersInput = z.infer<typeof VendorFiltersSchema>;
