import { RegisterInput, LoginInput } from '../schemas/auth.schema';
export declare class AuthService {
    register(data: RegisterInput): Promise<{
        name: string;
        email: string;
        phone: string | null;
        id: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(data: LoginInput): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getMe(userId: string): Promise<{
        name: string;
        email: string;
        phone: string | null;
        id: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    forgotPassword(email: string): Promise<{
        resetToken?: string | undefined;
        message: string;
    }>;
    resetPassword(_token: string, _newPassword: string): Promise<void>;
}
export declare const authService: AuthService;
