import { CreateVendorInput, UpdateVendorInput, VendorFiltersInput } from '../schemas/vendor.schema';
export declare class VendorService {
    /**
     * Criar novo fornecedor
     */
    create(data: CreateVendorInput): Promise<{
        name: string;
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal | null;
        status: string;
        eventId: string;
        category: string;
        notes: string | null;
        contact: string | null;
        rating: number | null;
    }>;
    /**
     * Buscar todos os fornecedores com filtros e ordenação
     */
    findAll(filters: VendorFiltersInput): Promise<{
        name: string;
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal | null;
        status: string;
        eventId: string;
        category: string;
        notes: string | null;
        contact: string | null;
        rating: number | null;
    }[]>;
    /**
     * Buscar fornecedor por ID
     */
    findById(vendorId: string): Promise<{
        name: string;
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal | null;
        status: string;
        eventId: string;
        category: string;
        notes: string | null;
        contact: string | null;
        rating: number | null;
    } | null>;
    /**
     * Atualizar fornecedor
     */
    update(vendorId: string, data: UpdateVendorInput): Promise<{
        name: string;
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal | null;
        status: string;
        eventId: string;
        category: string;
        notes: string | null;
        contact: string | null;
        rating: number | null;
    }>;
    /**
     * Deletar fornecedor
     */
    delete(vendorId: string): Promise<void>;
    /**
     * Marcar fornecedor como pago
     */
    markAsPaid(vendorId: string): Promise<{
        name: string;
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal | null;
        status: string;
        eventId: string;
        category: string;
        notes: string | null;
        contact: string | null;
        rating: number | null;
    }>;
    /**
     * Marcar fornecedor como atrasado
     */
    markAsOverdue(vendorId: string): Promise<{
        name: string;
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").Decimal | null;
        status: string;
        eventId: string;
        category: string;
        notes: string | null;
        contact: string | null;
        rating: number | null;
    }>;
    /**
     * Obter estatísticas dos fornecedores
     */
    getStats(eventId: string): Promise<{
        total: number;
        paid: number;
        pending: number;
        overdue: number;
        totalValue: number | import("@prisma/client/runtime/library").Decimal;
        paidValue: number | import("@prisma/client/runtime/library").Decimal;
        pendingValue: number | import("@prisma/client/runtime/library").Decimal;
        avgRating: number;
        byCategory: {
            category: any;
            count: any;
        }[];
    }>;
}
declare const _default: VendorService;
export default _default;
