import bcrypt from 'bcryptjs';
import { prisma } from '../config/database';
import { generateToken } from '../utils/jwt';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';
import crypto from 'crypto';

export class AuthService {
  async register(data: RegisterInput) {
    const { name, email, password, phone } = data;

    // Verificar se usuario ja existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('EMAIL_ALREADY_EXISTS');
    }

    // Hashear senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuario
    const user = await prisma.user.create({
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

  async login(data: LoginInput) {
    const { email, password } = data;

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    // Gerar token JWT
    const token = generateToken({ userId: user.id, email: user.email });

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

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
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

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Nao revelar se usuario existe ou nao por seguranca
      return {
        message: 'Se o email existir, um link de recuperacao sera enviado',
      };
    }

    // Gerar token de reset (32 caracteres aleatorios)
    const resetToken = crypto.randomBytes(32).toString('hex');

    // TODO: Hashear e armazenar token no banco (adicionar campos resetToken e resetTokenExpiry na tabela User)
    // TODO: Implementar envio de email com o token

    return {
      message: 'Se o email existir, um link de recuperacao sera enviado',
      // Em desenvolvimento, retornar o token para testes
      ...(process.env.NODE_ENV === 'development' && { resetToken }),
    };
  }

  async resetPassword(_token: string, _newPassword: string) {
    // TODO: Implementar verificacao do token e atualizacao de senha
    // Precisaremos adicionar campos resetToken e resetTokenExpiry na tabela User

    throw new Error('NOT_IMPLEMENTED');
  }
}

export const authService = new AuthService();
