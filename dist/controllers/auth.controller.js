"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_schema_1 = require("../schemas/auth.schema");
const zod_1 = require("zod");
class AuthController {
    async register(req, res, next) {
        try {
            const validatedData = auth_schema_1.RegisterSchema.parse(req.body);
            const user = await auth_service_1.authService.register(validatedData);
            res.status(201).json({
                success: true,
                data: {
                    user,
                    message: 'Usuario cadastrado com sucesso',
                },
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Erro de validacao',
                        details: error.issues,
                    },
                });
            }
            if (error instanceof Error) {
                if (error.message === 'EMAIL_ALREADY_EXISTS') {
                    return res.status(409).json({
                        success: false,
                        error: {
                            code: 'EMAIL_ALREADY_EXISTS',
                            message: 'Email ja cadastrado',
                        },
                    });
                }
            }
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const validatedData = auth_schema_1.LoginSchema.parse(req.body);
            const result = await auth_service_1.authService.login(validatedData);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Erro de validacao',
                        details: error.issues,
                    },
                });
            }
            if (error instanceof Error) {
                if (error.message === 'INVALID_CREDENTIALS') {
                    return res.status(401).json({
                        success: false,
                        error: {
                            code: 'INVALID_CREDENTIALS',
                            message: 'Email ou senha invalidos',
                        },
                    });
                }
            }
            next(error);
        }
    }
    async me(req, res, next) {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: {
                        code: 'UNAUTHORIZED',
                        message: 'Nao autorizado',
                    },
                });
            }
            const user = await auth_service_1.authService.getMe(userId);
            res.status(200).json({
                success: true,
                data: { user },
            });
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === 'USER_NOT_FOUND') {
                    return res.status(404).json({
                        success: false,
                        error: {
                            code: 'USER_NOT_FOUND',
                            message: 'Usuario nao encontrado',
                        },
                    });
                }
            }
            next(error);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const validatedData = auth_schema_1.ForgotPasswordSchema.parse(req.body);
            const result = await auth_service_1.authService.forgotPassword(validatedData.email);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Erro de validacao',
                        details: error.issues,
                    },
                });
            }
            next(error);
        }
    }
    async resetPassword(req, res, next) {
        try {
            const validatedData = auth_schema_1.ResetPasswordSchema.parse(req.body);
            await auth_service_1.authService.resetPassword(validatedData.token, validatedData.newPassword);
            res.status(200).json({
                success: true,
                data: {
                    message: 'Senha atualizada com sucesso',
                },
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Erro de validacao',
                        details: error.issues,
                    },
                });
            }
            if (error instanceof Error) {
                if (error.message === 'NOT_IMPLEMENTED') {
                    return res.status(501).json({
                        success: false,
                        error: {
                            code: 'NOT_IMPLEMENTED',
                            message: 'Funcionalidade ainda nao implementada',
                        },
                    });
                }
            }
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map