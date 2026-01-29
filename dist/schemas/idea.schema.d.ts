import { z } from 'zod';
export declare const CreateIdeaSchema: z.ZodObject<{
    eventId: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodEnum<{
        Fotografia: "Fotografia";
        DJ: "DJ";
        Local: "Local";
        Buffet: "Buffet";
        Decoracao: "Decoracao";
        Convites: "Convites";
        Flores: "Flores";
        Bolo: "Bolo";
        Lembrancinhas: "Lembrancinhas";
        Outro: "Outro";
        Vestuario: "Vestuario";
    }>;
    imageUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    sourceUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const UpdateIdeaSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    category: z.ZodOptional<z.ZodEnum<{
        Fotografia: "Fotografia";
        DJ: "DJ";
        Local: "Local";
        Buffet: "Buffet";
        Decoracao: "Decoracao";
        Convites: "Convites";
        Flores: "Flores";
        Bolo: "Bolo";
        Lembrancinhas: "Lembrancinhas";
        Outro: "Outro";
        Vestuario: "Vestuario";
    }>>;
    imageUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    sourceUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    isFavorite: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const IdeaFiltersSchema: z.ZodObject<{
    eventId: z.ZodString;
    category: z.ZodOptional<z.ZodEnum<{
        Fotografia: "Fotografia";
        DJ: "DJ";
        Local: "Local";
        Buffet: "Buffet";
        Decoracao: "Decoracao";
        Convites: "Convites";
        Flores: "Flores";
        Bolo: "Bolo";
        Lembrancinhas: "Lembrancinhas";
        Outro: "Outro";
        Vestuario: "Vestuario";
        all: "all";
    }>>;
    isFavorite: z.ZodOptional<z.ZodEnum<{
        all: "all";
        true: "true";
        false: "false";
    }>>;
    search: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateIdeaInput = z.infer<typeof CreateIdeaSchema>;
export type UpdateIdeaInput = z.infer<typeof UpdateIdeaSchema>;
export type IdeaFilters = z.infer<typeof IdeaFiltersSchema>;
