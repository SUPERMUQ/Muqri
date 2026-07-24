import app from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';

// Catch uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.fatal({ err: error }, 'Uncaught Exception detected! Shutting down process...');
  process.exit(1);
});

// Start HTTP Server
const server = app.listen(env.PORT, () => {
  logger.info(
    `🚀 Server running in ${env.NODE_ENV} mode at http://localhost:${env.PORT}`,
  );
  logger.info(`📚 Swagger documentation available at http://localhost:${env.PORT}/api-docs`);
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason: unknown) => {
  logger.fatal({ reason }, 'Unhandled Rejection detected! Shutting down server...');
  server.close(() => {
    process.exit(1);
  });
});

// Graceful Shutdown Handler
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Initiating graceful shutdown...`);
  server.close(() => {
    logger.info('HTTP server closed successfully.');
    process.exit(0);
  });

  // Force close after 10 seconds if shutdown hangs
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
