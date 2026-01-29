"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistFiltersSchema = exports.UpdateChecklistTaskSchema = exports.CreateChecklistTaskSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema para criação de tarefa do checklist
 */
exports.CreateChecklistTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Título é obrigatório'),
    description: zod_1.z.string().optional(),
    category: zod_1.z
        .enum(['venue', 'catering', 'decoration', 'photography', 'music', 'attire', 'invitations', 'other'])
        .default('other'),
    priority: zod_1.z.enum(['low', 'medium', 'high']).default('medium'),
    dueDate: zod_1.z.string().optional(), // ISO date string
});
/**
 * Schema para atualização de tarefa do checklist
 */
exports.UpdateChecklistTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Título é obrigatório').optional(),
    description: zod_1.z.string().optional(),
    category: zod_1.z
        .enum(['venue', 'catering', 'decoration', 'photography', 'music', 'attire', 'invitations', 'other'])
        .optional(),
    priority: zod_1.z.enum(['low', 'medium', 'high']).optional(),
    status: zod_1.z.enum(['pending', 'completed']).optional(),
    dueDate: zod_1.z.string().optional(), // ISO date string
});
/**
 * Schema para filtros de busca do checklist
 */
exports.ChecklistFiltersSchema = zod_1.z.object({
    status: zod_1.z.enum(['pending', 'completed']).optional(),
    category: zod_1.z
        .enum(['venue', 'catering', 'decoration', 'photography', 'music', 'attire', 'invitations', 'other'])
        .optional(),
    priority: zod_1.z.enum(['low', 'medium', 'high']).optional(),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=checklist.schema.js.map