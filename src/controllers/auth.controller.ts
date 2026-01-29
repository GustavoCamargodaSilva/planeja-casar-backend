/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../schemas/auth.schema';
import { ZodError } from 'zod';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = RegisterSchema.parse(req.body);

      const user = await authService.register(validatedData);

      res.status(201).json({
        success: true,
        data: {
          user,
          message: 'Usuario cadastrado com sucesso',
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = LoginSchema.parse(req.body);

      const result = await authService.login(validatedData);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      if (error instanceof ZodError) {
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

  async me(req: Request, res: Response, next: NextFunction) {
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

      const user = await authService.getMe(userId);

      res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (error) {
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

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = ForgotPasswordSchema.parse(req.body);

      const result = await authService.forgotPassword(validatedData.email);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      if (error instanceof ZodError) {
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

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = ResetPasswordSchema.parse(req.body);

      await authService.resetPassword(
        validatedData.token,
        validatedData.newPassword
      );

      res.status(200).json({
        success: true,
        data: {
          message: 'Senha atualizada com sucesso',
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
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

export const authController = new AuthController();
