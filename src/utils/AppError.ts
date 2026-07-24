export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(message: string, statusCode: number = 500, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string = 'Bad Request', details?: unknown): AppError {
    return new AppError(message, 400, details);
  }

  static unauthorized(message: string = 'Unauthorized'): AppError {
    return new AppError(message, 401);
  }

  static forbidden(message: string = 'Forbidden'): AppError {
    return new AppError(message, 403);
  }

  static notFound(message: string = 'Resource Not Found'): AppError {
    return new AppError(message, 404);
  }

  static conflict(message: string = 'Resource Conflict'): AppError {
    return new AppError(message, 409);
  }

  static internal(message: string = 'Internal Server Error'): AppError {
    return new AppError(message, 500);
  }
}
