import { z } from 'zod';
export declare const CreateVendorSchema: z.ZodObject<{
    eventId: z.ZodString;
    name: z.ZodString;
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
    contact: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    value: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    notes: z.ZodOptional<z.ZodString>;
    rating: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const UpdateVendorSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
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
    contact: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    value: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        paid: "paid";
        overdue: "overdue";
    }>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    rating: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const VendorFiltersSchema: z.ZodObject<{
    eventId: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        paid: "paid";
        overdue: "overdue";
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
    sortBy: z.ZodOptional<z.ZodEnum<{
        name: "name";
        createdAt: "createdAt";
        value: "value";
        category: "category";
        rating: "rating";
    }>>;
}, z.core.$strip>;
export type CreateVendorInput = z.infer<typeof CreateVendorSchema>;
export type UpdateVendorInput = z.infer<typeof UpdateVendorSchema>;
export type VendorFiltersInput = z.infer<typeof VendorFiltersSchema>;
