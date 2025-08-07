import { Request } from "express";

// Extender Request para incluir propiedades personalizadas
export interface AppRequest extends Request {
  user?: any;
  startTime?: number;
}

// Tipos para respuestas de la API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para estadísticas
export interface PortfolioStats {
  totalProjects: number;
  totalSkills: number;
  totalAchievements: number;
  totalLanguages: number;
  skillCategories: number;
}

// Tipos para búsqueda
export interface SearchParams {
  technology?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResults<T> {
  searchTerm: string;
  results: T[];
  totalResults: number;
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
  };
} 