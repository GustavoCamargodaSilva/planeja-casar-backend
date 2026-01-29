import { Request, Response, NextFunction } from 'express';
export interface AppError extends Error {
    statusCode?: number;
    code?: string;
    details?: unknown;
}
export declare class ApiError extends Error implements AppError {
    statusCode: number;
    code: string;
    details?: unknown;
    constructor(statusCode: number, message: string, code?: string, details?: unknown);
    static badRequest(message: string, details?: unknown): ApiError;
    static unauthorized(message?: string): ApiError;
    static forbidden(message?: string): ApiError;
    static notFound(message?: string): ApiError;
    static conflict(message: string, details?: unknown): ApiError;
    static internal(message?: string): ApiError;
}
export declare function errorHandler(err: AppError, req: Request, res: Response, _next: NextFunction): void;
