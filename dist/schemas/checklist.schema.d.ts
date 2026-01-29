import { z } from 'zod';
/**
 * Schema para criação de tarefa do checklist
 */
export declare const CreateChecklistTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodDefault<z.ZodEnum<{
        other: "other";
        venue: "venue";
        catering: "catering";
        decoration: "decoration";
        photography: "photography";
        music: "music";
        attire: "attire";
        invitations: "invitations";
    }>>;
    priority: z.ZodDefault<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>>;
    dueDate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schema para atualização de tarefa do checklist
 */
export declare const UpdateChecklistTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<{
        other: "other";
        venue: "venue";
        catering: "catering";
        decoration: "decoration";
        photography: "photography";
        music: "music";
        attire: "attire";
        invitations: "invitations";
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        completed: "completed";
        pending: "pending";
    }>>;
    dueDate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schema para filtros de busca do checklist
 */
export declare const ChecklistFiltersSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        completed: "completed";
        pending: "pending";
    }>>;
    category: z.ZodOptional<z.ZodEnum<{
        other: "other";
        venue: "venue";
        catering: "catering";
        decoration: "decoration";
        photography: "photography";
        music: "music";
        attire: "attire";
        invitations: "invitations";
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Tipos TypeScript derivados dos schemas
 */
export type CreateChecklistTaskInput = z.infer<typeof CreateChecklistTaskSchema>;
export type UpdateChecklistTaskInput = z.infer<typeof UpdateChecklistTaskSchema>;
export type ChecklistFiltersInput = z.infer<typeof ChecklistFiltersSchema>;
