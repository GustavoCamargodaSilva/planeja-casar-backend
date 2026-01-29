"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinEventSchema = exports.UpdateEventSchema = exports.CreateEventSchema = void 0;
const zod_1 = require("zod");
exports.CreateEventSchema = zod_1.z.object({
    eventType: zod_1.z.string().min(1, 'Tipo de evento é obrigatório').default('Casamento'),
    date: zod_1.z.string().datetime('Data inválida'),
    venue: zod_1.z.string().optional(),
    budget: zod_1.z.number().positive('Orçamento deve ser positivo').optional(),
});
exports.UpdateEventSchema = zod_1.z.object({
    eventType: zod_1.z.string().min(1, 'Tipo de evento é obrigatório').optional(),
    date: zod_1.z.string().datetime('Data inválida').optional(),
    venue: zod_1.z.string().optional(),
    status: zod_1.z.enum(['Em andamento', 'Concluído', 'Cancelado']).optional(),
    budget: zod_1.z.number().positive('Orçamento deve ser positivo').optional(),
});
exports.JoinEventSchema = zod_1.z.object({
    inviteCode: zod_1.z.string().uuid('Código de convite inválido'),
});
//# sourceMappingURL=event.schema.js.map