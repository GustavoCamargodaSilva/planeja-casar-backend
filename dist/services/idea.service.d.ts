import { CreateIdeaInput, UpdateIdeaInput, IdeaFilters } from '../schemas/idea.schema';
export declare class IdeaService {
    /**
     * Criar nova ideia
     */
    create(data: CreateIdeaInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        eventId: string;
        title: string;
        description: string | null;
        category: string;
        imageUrl: string | null;
        sourceUrl: string | null;
        tags: string[];
        isFavorite: boolean;
    }>;
    /**
     * Listar ideias com filtros
     */
    findAll(filters: IdeaFilters): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        eventId: string;
        title: string;
        description: string | null;
        category: string;
        imageUrl: string | null;
        sourceUrl: string | null;
        tags: string[];
        isFavorite: boolean;
    }[]>;
    /**
     * Buscar ideia por ID
     */
    findById(ideaId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        eventId: string;
        title: string;
        description: string | null;
        category: string;
        imageUrl: string | null;
        sourceUrl: string | null;
        tags: string[];
        isFavorite: boolean;
    } | null>;
    /**
     * Atualizar ideia
     */
    update(ideaId: string, data: UpdateIdeaInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        eventId: string;
        title: string;
        description: string | null;
        category: string;
        imageUrl: string | null;
        sourceUrl: string | null;
        tags: string[];
        isFavorite: boolean;
    }>;
    /**
     * Deletar ideia
     */
    delete(ideaId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        eventId: string;
        title: string;
        description: string | null;
        category: string;
        imageUrl: string | null;
        sourceUrl: string | null;
        tags: string[];
        isFavorite: boolean;
    }>;
    /**
     * Alternar status de favorito
     */
    toggleFavorite(ideaId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        eventId: string;
        title: string;
        description: string | null;
        category: string;
        imageUrl: string | null;
        sourceUrl: string | null;
        tags: string[];
        isFavorite: boolean;
    }>;
    /**
     * Obter estatísticas das ideias
     */
    getStats(eventId: string): Promise<{
        total: number;
        favorites: number;
        totalTags: number;
        byCategory: {
            category: string;
            count: number;
        }[];
    }>;
}
declare const _default: IdeaService;
export default _default;
