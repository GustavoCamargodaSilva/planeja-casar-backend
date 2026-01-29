"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaFiltersSchema = exports.UpdateIdeaSchema = exports.CreateIdeaSchema = void 0;
// src/schemas/idea.schema.ts
const zod_1 = require("zod");
// Categorias permitidas para ideias
const ideaCategories = [
    'Decoracao',
    'Vestuario',
    'Convites',
    'Buffet',
    'Flores',
    'Local',
    'Fotografia',
    'DJ',
    'Bolo',
    'Lembrancinhas',
    'Outro',
];
// Schema para criar uma nova ideia
exports.CreateIdeaSchema = zod_1.z.object({
    eventId: zod_1.z.string().uuid('ID do evento inválido'),
    title: zod_1.z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
    description: zod_1.z.string().max(1000, 'Descrição muito longa').optional(),
    category: zod_1.z.enum(ideaCategories),
    imageUrl: zod_1.z.string().url('URL da imagem inválida').optional().or(zod_1.z.literal('')),
    sourceUrl: zod_1.z.string().url('URL da fonte inválida').optional().or(zod_1.z.literal('')),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
});
// Schema para atualizar uma ideia
exports.UpdateIdeaSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo').optional(),
    description: zod_1.z.string().max(1000, 'Descrição muito longa').optional().or(zod_1.z.literal('')),
    category: zod_1.z.enum(ideaCategories).optional(),
    imageUrl: zod_1.z.string().url('URL da imagem inválida').optional().or(zod_1.z.literal('')),
    sourceUrl: zod_1.z.string().url('URL da fonte inválida').optional().or(zod_1.z.literal('')),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    isFavorite: zod_1.z.boolean().optional(),
});
// Schema para filtros de ideias
exports.IdeaFiltersSchema = zod_1.z.object({
    eventId: zod_1.z.string().uuid('ID do evento inválido'),
    category: zod_1.z.enum([...ideaCategories, 'all']).optional(),
    isFavorite: zod_1.z.enum(['true', 'false', 'all']).optional(),
    search: zod_1.z.string().optional(),
    tags: zod_1.z.string().optional(), // Comma-separated tags
});
//# sourceMappingURL=idea.schema.js.map