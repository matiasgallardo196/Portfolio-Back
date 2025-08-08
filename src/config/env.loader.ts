import { config as dotenvConfig } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenvConfig({ path: ".env.development" });
}

// Database Configuration
export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = parseInt(process.env.DB_PORT || "5432");
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;

// Environment
export const NODE_ENV = process.env.NODE_ENV || "development";

// Application
export const PORT = parseInt(process.env.PORT || "3001");

// CORS
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
