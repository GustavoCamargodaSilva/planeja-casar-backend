"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const jwt_1 = require("../utils/jwt");
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    async register(data) {
        const { name, email, password, phone } = data;
        // Verificar se usuario ja existe
        const existingUser = await database_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error('EMAIL_ALREADY_EXISTS');
        }
        // Hashear senha
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Criar usuario
        const user = await database_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    async login(data) {
        const { email, password } = data;
        // Buscar usuario
        const user = await database_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error('INVALID_CREDENTIALS');
        }
        // Verificar senha
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('INVALID_CREDENTIALS');
        }
        // Gerar token JWT
        const token = (0, jwt_1.generateToken)({ userId: user.id, email: user.email });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        };
    }
    async getMe(userId) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }
        return user;
    }
    async forgotPassword(email) {
        const user = await database_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            // Nao revelar se usuario existe ou nao por seguranca
            return {
                message: 'Se o email existir, um link de recuperacao sera enviado',
            };
        }
        // Gerar token de reset (32 caracteres aleatorios)
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        // TODO: Hashear e armazenar token no banco (adicionar campos resetToken e resetTokenExpiry na tabela User)
        // TODO: Implementar envio de email com o token
        return {
            message: 'Se o email existir, um link de recuperacao sera enviado',
            // Em desenvolvimento, retornar o token para testes
            ...(process.env.NODE_ENV === 'development' && { resetToken }),
        };
    }
    async resetPassword(_token, _newPassword) {
        // TODO: Implementar verificacao do token e atualizacao de senha
        // Precisaremos adicionar campos resetToken e resetTokenExpiry na tabela User
        throw new Error('NOT_IMPLEMENTED');
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map