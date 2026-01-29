"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const logger_1 = require("../utils/logger");
class ApiError extends Error {
    constructor(statusCode, message, code, details) {
        super(message);
        this.statusCode = statusCode;
        this.code = code || 'INTERNAL_ERROR';
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message, details) {
        return new ApiError(400, message, 'BAD_REQUEST', details);
    }
    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, message, 'UNAUTHORIZED');
    }
    static forbidden(message = 'Forbidden') {
        return new ApiError(403, message, 'FORBIDDEN');
    }
    static notFound(message = 'Resource not found') {
        return new ApiError(404, message, 'NOT_FOUND');
    }
    static conflict(message, details) {
        return new ApiError(409, message, 'CONFLICT', details);
    }
    static internal(message = 'Internal server error') {
        return new ApiError(500, message, 'INTERNAL_ERROR');
    }
}
exports.ApiError = ApiError;
function errorHandler(err, req, res, _next) {
    logger_1.logger.error(err.message, { stack: err.stack, path: req.path, method: req.method });
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Dados invalidos',
                details: err.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                })),
            },
        });
        return;
    }
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                details: err.details,
            },
        });
        return;
    }
    res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message: 'Erro interno do servidor',
        },
    });
}
//# sourceMappingURL=errorHandler.js.map