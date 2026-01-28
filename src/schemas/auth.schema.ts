import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no minimo 2 caracteres').max(100),
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'Senha deve ter no minimo 6 caracteres'),
  confirmPassword: z.string().min(6),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas nao coincidem',
  path: ['confirmPassword'],
});

export const LoginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(1, 'Senha e obrigatoria'),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Email invalido'),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Token e obrigatorio'),
  newPassword: z.string().min(6, 'Senha deve ter no minimo 6 caracteres'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
