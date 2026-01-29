import { z } from 'zod';
export declare const CreateGuestSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    phone: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodEnum<{
        adult: "adult";
        child: "child";
    }>>;
    side: z.ZodDefault<z.ZodEnum<{
        groom: "groom";
        bride: "bride";
        "groom-family": "groom-family";
        "bride-family": "bride-family";
        friends: "friends";
    }>>;
    status: z.ZodDefault<z.ZodEnum<{
        pending: "pending";
        confirmed: "confirmed";
        declined: "declined";
    }>>;
    tableNumber: z.ZodOptional<z.ZodNumber>;
    dietaryNotes: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateGuestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    phone: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        adult: "adult";
        child: "child";
    }>>;
    side: z.ZodOptional<z.ZodEnum<{
        groom: "groom";
        bride: "bride";
        "groom-family": "groom-family";
        "bride-family": "bride-family";
        friends: "friends";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        confirmed: "confirmed";
        declined: "declined";
    }>>;
    tableNumber: z.ZodOptional<z.ZodNumber>;
    dietaryNotes: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const GuestFiltersSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        confirmed: "confirmed";
        declined: "declined";
    }>>;
    type: z.ZodOptional<z.ZodEnum<{
        adult: "adult";
        child: "child";
    }>>;
    side: z.ZodOptional<z.ZodEnum<{
        groom: "groom";
        bride: "bride";
        "groom-family": "groom-family";
        "bride-family": "bride-family";
        friends: "friends";
    }>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateGuestInput = z.infer<typeof CreateGuestSchema>;
export type UpdateGuestInput = z.infer<typeof UpdateGuestSchema>;
export type GuestFiltersInput = z.infer<typeof GuestFiltersSchema>;
