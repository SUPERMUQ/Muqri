import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import pinoHttp from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { join } from 'path';

import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { globalRateLimiter } from './middlewares/rateLimiter.js';
import { notFoundHandler } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import apiRouter from './routes/index.js';

const app: Application = express();

// Security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled for static demo asset loading & inline scripts
  }),
);

// CORS configuration
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);

// Gzip compression
app.use(compression());

// Body parser with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP request logging
app.use(
  pinoHttp({
    logger,
    autoLogging: env.NODE_ENV !== 'test',
  }),
);

// Serve static frontend landing page
app.use(express.static(join(process.cwd(), 'public')));

// Global Rate Limiting
app.use(globalRateLimiter);

// Swagger Documentation API UI
try {
  const swaggerSpec = JSON.parse(
    readFileSync(join(process.cwd(), 'src', 'docs', 'swagger.json'), 'utf-8'),
  );
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
} catch (err) {
  logger.warn({ err }, 'Swagger documentation file not loaded');
}

// API Routes setup
app.use('/api/v1', apiRouter);

// 404 handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;
