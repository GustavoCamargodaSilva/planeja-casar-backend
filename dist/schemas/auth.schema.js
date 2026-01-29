"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = exports.ForgotPasswordSchema = exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = require("zod");
exports.RegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Nome deve ter no minimo 2 caracteres').max(100),
    email: zod_1.z.string().email('Email invalido'),
    password: zod_1.z.string().min(6, 'Senha deve ter no minimo 6 caracteres'),
    confirmPassword: zod_1.z.string().min(6),
    phone: zod_1.z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas nao coincidem',
    path: ['confirmPassword'],
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email invalido'),
    password: zod_1.z.string().min(1, 'Senha e obrigatoria'),
});
exports.ForgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email invalido'),
});
exports.ResetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Token e obrigatorio'),
    newPassword: zod_1.z.string().min(6, 'Senha deve ter no minimo 6 caracteres'),
});
//# sourceMappingURL=auth.schema.js.map