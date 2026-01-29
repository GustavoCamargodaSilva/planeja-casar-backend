import { CreateGuestInput, UpdateGuestInput, GuestFiltersInput } from '../schemas/guest.schema';
declare class GuestService {
    create(eventId: string, data: CreateGuestInput): Promise<{
        type: string;
        name: string;
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        eventId: string;
        side: string;
        tableNumber: number | null;
        dietaryNotes: string | null;
        notes: string | null;
    }>;
    findAll(eventId: string, filters?: GuestFiltersInput): Promise<{
        type: string;
        name: string;
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        eventId: string;
        side: string;
        tableNumber: number | null;
        dietaryNotes: string | null;
        notes: string | null;
    }[]>;
    findById(guestId: string): Promise<{
        event: {
            id: string;
            eventType: string;
            date: Date;
        };
    } & {
        type: string;
        name: string;
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        eventId: string;
        side: string;
        tableNumber: number | null;
        dietaryNotes: string | null;
        notes: string | null;
    }>;
    update(guestId: string, data: UpdateGuestInput): Promise<{
        type: string;
        name: string;
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        eventId: string;
        side: string;
        tableNumber: number | null;
        dietaryNotes: string | null;
        notes: string | null;
    }>;
    delete(guestId: string): Promise<{
        message: string;
    }>;
    getStats(eventId: string): Promise<{
        total: number;
        adults: number;
        children: number;
        confirmed: number;
        pending: number;
        declined: number;
    }>;
}
declare const _default: GuestService;
export default _default;
