import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: 'Token nao fornecido',
        },
      });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN_FORMAT',
          message: 'Formato de token invalido',
        },
      });
    }

    const token = parts[1];

    try {
      const payload = verifyToken(token);

      req.userId = payload.userId;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Token invalido ou expirado',
        },
      });
    }
  } catch (error) {
    next(error);
  }
}
