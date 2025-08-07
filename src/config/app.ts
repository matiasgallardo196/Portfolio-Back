export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
  api: {
    baseUrl: "/api",
    version: "v1",
  },
  logging: {
    enabled: process.env.LOGGING_ENABLED !== "false",
    level: process.env.LOG_LEVEL || "info",
  },
}; 