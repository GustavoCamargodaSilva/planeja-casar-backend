"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineFiltersSchema = exports.UpdateTimelineTaskSchema = exports.CreateTimelineTaskSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema para criação de tarefa do cronograma
 */
exports.CreateTimelineTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Título é obrigatório'),
    description: zod_1.z.string().optional(),
    date: zod_1.z.string(), // ISO date string
    time: zod_1.z.string().optional(), // HH:MM format
});
/**
 * Schema para atualização de tarefa do cronograma
 */
exports.UpdateTimelineTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Título é obrigatório').optional(),
    description: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(), // ISO date string
    time: zod_1.z.string().optional(), // HH:MM format
    status: zod_1.z.enum(['pending', 'in_progress', 'completed']).optional(),
});
/**
 * Schema para filtros de busca do cronograma
 */
exports.TimelineFiltersSchema = zod_1.z.object({
    status: zod_1.z.enum(['pending', 'in_progress', 'completed']).optional(),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=timeline.schema.js.map