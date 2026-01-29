import { CreateEventInput, UpdateEventInput, JoinEventInput } from '../schemas/event.schema';
import { Decimal } from '@prisma/client/runtime/library';
declare class EventService {
    create(userId: string, data: CreateEventInput): Promise<{
        budget: Decimal | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        eventType: string;
        date: Date;
        venue: string | null;
        status: string;
        inviteCode: string;
        overallProgress: number;
        ownerId: string;
    }>;
    findByUser(userId: string): Promise<any[]>;
    findById(eventId: string, userId: string): Promise<{
        userRole: string;
        owner: {
            name: string;
            email: string;
            id: string;
            avatar: string | null;
        };
        members: ({
            user: {
                name: string;
                email: string;
                id: string;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            role: string;
            eventId: string;
            userId: string;
        })[];
        budget: Decimal | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        eventType: string;
        date: Date;
        venue: string | null;
        status: string;
        inviteCode: string;
        overallProgress: number;
        ownerId: string;
    }>;
    update(eventId: string, userId: string, data: UpdateEventInput): Promise<{
        budget: Decimal | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        eventType: string;
        date: Date;
        venue: string | null;
        status: string;
        inviteCode: string;
        overallProgress: number;
        ownerId: string;
    }>;
    delete(eventId: string, userId: string): Promise<{
        message: string;
    }>;
    joinByCode(userId: string, data: JoinEventInput): Promise<{
        budget: Decimal | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        eventType: string;
        date: Date;
        venue: string | null;
        status: string;
        inviteCode: string;
        overallProgress: number;
        ownerId: string;
    }>;
    calculateProgress(eventId: string): Promise<number>;
}
declare const _default: EventService;
export default _default;
