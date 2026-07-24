import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getHealth = asyncHandler(async (_req: Request, res: Response) => {
  const healthCheck = {
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memoryUsage: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
  };

  res.status(200).json({
    success: true,
    data: healthCheck,
  });
});
