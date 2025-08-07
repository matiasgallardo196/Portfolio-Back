import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class CustomError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error("Error:", err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Recurso no encontrado";
    error = new CustomError(message, 404);
  }

  // Mongoose duplicate key
  if (err.name === "MongoError" && (err as any).code === 11000) {
    const message = "Valor duplicado";
    error = new CustomError(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values((err as any).errors)
      .map((val: any) => val.message)
      .join(", ");
    error = new CustomError(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Error interno del servidor",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const requestedUrl = req.originalUrl;

  // Si la URL no incluye /api, sugerir agregarlo
  if (!requestedUrl.startsWith("/api") && !requestedUrl.startsWith("/health")) {
    const suggestedUrl = `/api${requestedUrl}`;
    return res.status(404).json({
      error: "Endpoint no encontrado",
      message: `La ruta '${requestedUrl}' no existe`,
      suggestion: `¿Quizás quisiste acceder a '${suggestedUrl}'?`,
      availableEndpoints: [
        "/api/portfolio",
        "/api/about",
        "/api/skills",
        "/api/skills/:category",
        "/api/projects",
        "/api/projects/:id",
        "/api/achievements",
        "/api/languages",
        "/api/contact",
        "/api/theme",
        "/api/search/projects",
        "/api/stats",
        "/health",
      ],
      documentation:
        "Consulta /health para ver todos los endpoints disponibles",
    });
  }

  // Para otras rutas no encontradas
  const error = new CustomError(
    `Endpoint no encontrado - ${requestedUrl}`,
    404
  );
  next(error);
};
