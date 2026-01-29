import { z } from 'zod';
/**
 * Schema para criação de tarefa do cronograma
 */
export declare const CreateTimelineTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    date: z.ZodString;
    time: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schema para atualização de tarefa do cronograma
 */
export declare const UpdateTimelineTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    time: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        completed: "completed";
        pending: "pending";
        in_progress: "in_progress";
    }>>;
}, z.core.$strip>;
/**
 * Schema para filtros de busca do cronograma
 */
export declare const TimelineFiltersSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        completed: "completed";
        pending: "pending";
        in_progress: "in_progress";
    }>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Tipos TypeScript derivados dos schemas
 */
export type CreateTimelineTaskInput = z.infer<typeof CreateTimelineTaskSchema>;
export type UpdateTimelineTaskInput = z.infer<typeof UpdateTimelineTaskSchema>;
export type TimelineFiltersInput = z.infer<typeof TimelineFiltersSchema>;
