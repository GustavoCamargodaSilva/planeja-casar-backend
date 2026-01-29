"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestFiltersSchema = exports.UpdateGuestSchema = exports.CreateGuestSchema = void 0;
const zod_1 = require("zod");
// Criar convidado
exports.CreateGuestSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Nome é obrigatório'),
    email: zod_1.z.string().email('Email inválido').optional().or(zod_1.z.literal('')),
    phone: zod_1.z.string().optional(),
    type: zod_1.z.enum(['adult', 'child']).default('adult'),
    side: zod_1.z.enum(['groom', 'bride', 'groom-family', 'bride-family', 'friends']).default('friends'),
    status: zod_1.z.enum(['pending', 'confirmed', 'declined']).default('pending'),
    tableNumber: zod_1.z.number().int().positive().optional(),
    dietaryNotes: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
// Atualizar convidado
exports.UpdateGuestSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Nome é obrigatório').optional(),
    email: zod_1.z.string().email('Email inválido').optional().or(zod_1.z.literal('')),
    phone: zod_1.z.string().optional(),
    type: zod_1.z.enum(['adult', 'child']).optional(),
    side: zod_1.z.enum(['groom', 'bride', 'groom-family', 'bride-family', 'friends']).optional(),
    status: zod_1.z.enum(['pending', 'confirmed', 'declined']).optional(),
    tableNumber: zod_1.z.number().int().positive().optional(),
    dietaryNotes: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
// Filtros de convidados
exports.GuestFiltersSchema = zod_1.z.object({
    status: zod_1.z.enum(['pending', 'confirmed', 'declined']).optional(),
    type: zod_1.z.enum(['adult', 'child']).optional(),
    side: zod_1.z.enum(['groom', 'bride', 'groom-family', 'bride-family', 'friends']).optional(),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=guest.schema.js.map