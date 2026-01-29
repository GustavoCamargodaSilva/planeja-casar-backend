import { z } from 'zod';
export declare const CreateBudgetSchema: z.ZodObject<{
    eventId: z.ZodString;
    vendorName: z.ZodString;
    category: z.ZodEnum<{
        Fotografia: "Fotografia";
        DJ: "DJ";
        Local: "Local";
        Buffet: "Buffet";
        Decoracao: "Decoracao";
        Convites: "Convites";
        Flores: "Flores";
        Vestidos: "Vestidos";
        Bolo: "Bolo";
        Lembrancinhas: "Lembrancinhas";
        Transporte: "Transporte";
        Outro: "Outro";
    }>;
    description: z.ZodOptional<z.ZodString>;
    value: z.ZodNumber;
    validUntil: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateBudgetSchema: z.ZodObject<{
    vendorName: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<{
        Fotografia: "Fotografia";
        DJ: "DJ";
        Local: "Local";
        Buffet: "Buffet";
        Decoracao: "Decoracao";
        Convites: "Convites";
        Flores: "Flores";
        Vestidos: "Vestidos";
        Bolo: "Bolo";
        Lembrancinhas: "Lembrancinhas";
        Transporte: "Transporte";
        Outro: "Outro";
    }>>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    value: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        approved: "approved";
        rejected: "rejected";
    }>>;
    validUntil: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const BudgetFiltersSchema: z.ZodObject<{
    eventId: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        approved: "approved";
        rejected: "rejected";
    }>>;
    category: z.ZodOptional<z.ZodEnum<{
        Fotografia: "Fotografia";
        DJ: "DJ";
        Local: "Local";
        Buffet: "Buffet";
        Decoracao: "Decoracao";
        Convites: "Convites";
        Flores: "Flores";
        Vestidos: "Vestidos";
        Bolo: "Bolo";
        Lembrancinhas: "Lembrancinhas";
        Transporte: "Transporte";
        Outro: "Outro";
    }>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateBudgetInput = z.infer<typeof CreateBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof UpdateBudgetSchema>;
export type BudgetFiltersInput = z.infer<typeof BudgetFiltersSchema>;
