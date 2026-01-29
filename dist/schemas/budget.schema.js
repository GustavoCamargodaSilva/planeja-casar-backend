"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetFiltersSchema = exports.UpdateBudgetSchema = exports.CreateBudgetSchema = void 0;
const zod_1 = require("zod");
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
];
// Status válidos para orçamentos
const budgetStatuses = ['pending', 'approved', 'rejected'];
// Schema para criar um novo orçamento
exports.CreateBudgetSchema = zod_1.z.object({
    eventId: zod_1.z.string().uuid('Event ID deve ser um UUID válido'),
    vendorName: zod_1.z
        .string()
        .min(2, 'Nome do fornecedor deve ter pelo menos 2 caracteres')
        .max(100, 'Nome do fornecedor deve ter no máximo 100 caracteres'),
    category: zod_1.z.enum(budgetCategories),
    description: zod_1.z
        .string()
        .max(500, 'Descrição deve ter no máximo 500 caracteres')
        .optional(),
    value: zod_1.z
        .number()
        .positive('Valor deve ser positivo')
        .max(999999.99, 'Valor muito alto'),
    validUntil: zod_1.z
        .string()
        .datetime('Data de validade deve ser uma data válida')
        .optional()
        .nullable(),
    notes: zod_1.z.string().max(1000, 'Notas devem ter no máximo 1000 caracteres').optional(),
});
// Schema para atualizar um orçamento
exports.UpdateBudgetSchema = zod_1.z.object({
    vendorName: zod_1.z
        .string()
        .min(2, 'Nome do fornecedor deve ter pelo menos 2 caracteres')
        .max(100, 'Nome do fornecedor deve ter no máximo 100 caracteres')
        .optional(),
    category: zod_1.z
        .enum(budgetCategories)
        .optional(),
    description: zod_1.z
        .string()
        .max(500, 'Descrição deve ter no máximo 500 caracteres')
        .optional()
        .nullable(),
    value: zod_1.z
        .number()
        .positive('Valor deve ser positivo')
        .max(999999.99, 'Valor muito alto')
        .optional(),
    status: zod_1.z
        .enum(budgetStatuses)
        .optional(),
    validUntil: zod_1.z
        .string()
        .datetime('Data de validade deve ser uma data válida')
        .optional()
        .nullable(),
    notes: zod_1.z.string().max(1000, 'Notas devem ter no máximo 1000 caracteres').optional().nullable(),
});
// Schema para filtros de orçamento
exports.BudgetFiltersSchema = zod_1.z.object({
    eventId: zod_1.z.string().uuid('Event ID deve ser um UUID válido'),
    status: zod_1.z.enum(budgetStatuses).optional(),
    category: zod_1.z.enum(budgetCategories).optional(),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=budget.schema.js.map