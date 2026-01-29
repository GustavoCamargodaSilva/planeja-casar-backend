"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env");
const database_1 = require("./config/database");
const logger_1 = require("./utils/logger");
const errorHandler_1 = require("./middleware/errorHandler");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: env_1.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Event-Id'],
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: env_1.env.NODE_ENV === 'development' ? 1000 : 100, // Higher limit in dev
    message: {
        success: false,
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Muitas requisicoes. Tente novamente mais tarde.',
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
});
// Only apply rate limiting in production
if (env_1.env.NODE_ENV === 'production') {
    app.use(limiter);
}
app.use('/api', routes_1.default);
app.use(errorHandler_1.errorHandler);
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'Rota nao encontrada',
        },
    });
});
async function bootstrap() {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(env_1.env.PORT, () => {
            logger_1.logger.info(`Server running on port ${env_1.env.PORT}`);
            logger_1.logger.info(`Environment: ${env_1.env.NODE_ENV}`);
            logger_1.logger.info(`Frontend URL: ${env_1.env.FRONTEND_URL}`);
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
}
bootstrap();
exports.default = app;
//# sourceMappingURL=server.js.map