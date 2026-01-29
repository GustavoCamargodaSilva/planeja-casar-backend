"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorFiltersSchema = exports.UpdateVendorSchema = exports.CreateVendorSchema = void 0;
const zod_1 = require("zod");
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
];
// Status válidos para fornecedores
const vendorStatuses = ['paid', 'pending', 'overdue'];
// Schema para criar um novo fornecedor
exports.CreateVendorSchema = zod_1.z.object({
    eventId: zod_1.z.string().uuid('Event ID deve ser um UUID válido'),
    name: zod_1.z
        .string()
        .min(2, 'Nome do fornecedor deve ter pelo menos 2 caracteres')
        .max(100, 'Nome do fornecedor deve ter no máximo 100 caracteres'),
    category: zod_1.z.enum(vendorCategories),
    contact: zod_1.z
        .string()
        .max(100, 'Nome do contato deve ter no máximo 100 caracteres')
        .optional(),
    phone: zod_1.z
        .string()
        .max(20, 'Telefone deve ter no máximo 20 caracteres')
        .optional(),
    email: zod_1.z
        .string()
        .email('Email inválido')
        .optional(),
    value: zod_1.z
        .number()
        .positive('Valor deve ser positivo')
        .max(999999.99, 'Valor muito alto')
        .optional()
        .nullable(),
    notes: zod_1.z.string().max(1000, 'Notas devem ter no máximo 1000 caracteres').optional(),
    rating: zod_1.z
        .number()
        .int('Rating deve ser um número inteiro')
        .min(1, 'Rating mínimo é 1')
        .max(5, 'Rating máximo é 5')
        .optional()
        .nullable(),
});
// Schema para atualizar um fornecedor
exports.UpdateVendorSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nome do fornecedor deve ter pelo menos 2 caracteres')
        .max(100, 'Nome do fornecedor deve ter no máximo 100 caracteres')
        .optional(),
    category: zod_1.z.enum(vendorCategories).optional(),
    contact: zod_1.z
        .string()
        .max(100, 'Nome do contato deve ter no máximo 100 caracteres')
        .optional()
        .nullable(),
    phone: zod_1.z
        .string()
        .max(20, 'Telefone deve ter no máximo 20 caracteres')
        .optional()
        .nullable(),
    email: zod_1.z
        .string()
        .email('Email inválido')
        .optional()
        .nullable(),
    value: zod_1.z
        .number()
        .positive('Valor deve ser positivo')
        .max(999999.99, 'Valor muito alto')
        .optional()
        .nullable(),
    status: zod_1.z.enum(vendorStatuses).optional(),
    notes: zod_1.z.string().max(1000, 'Notas devem ter no máximo 1000 caracteres').optional().nullable(),
    rating: zod_1.z
        .number()
        .int('Rating deve ser um número inteiro')
        .min(1, 'Rating mínimo é 1')
        .max(5, 'Rating máximo é 5')
        .optional()
        .nullable(),
});
// Schema para filtros de fornecedor
exports.VendorFiltersSchema = zod_1.z.object({
    eventId: zod_1.z.string().uuid('Event ID deve ser um UUID válido'),
    status: zod_1.z.enum(vendorStatuses).optional(),
    category: zod_1.z.enum(vendorCategories).optional(),
    search: zod_1.z.string().optional(),
    sortBy: zod_1.z.enum(['name', 'category', 'value', 'rating', 'createdAt']).optional(),
});
//# sourceMappingURL=vendor.schema.js.map