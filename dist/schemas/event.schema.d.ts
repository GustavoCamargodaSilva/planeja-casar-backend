import { z } from 'zod';
export declare const CreateEventSchema: z.ZodObject<{
    eventType: z.ZodDefault<z.ZodString>;
    date: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
    budget: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const UpdateEventSchema: z.ZodObject<{
    eventType: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    venue: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        "Em andamento": "Em andamento";
        Concluído: "Concluído";
        Cancelado: "Cancelado";
    }>>;
    budget: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const JoinEventSchema: z.ZodObject<{
    inviteCode: z.ZodString;
}, z.core.$strip>;
export type CreateEventInput = z.infer<typeof CreateEventSchema>;
export type UpdateEventInput = z.infer<typeof UpdateEventSchema>;
export type JoinEventInput = z.infer<typeof JoinEventSchema>;
