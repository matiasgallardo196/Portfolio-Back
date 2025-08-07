import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { loggerMiddleware } from "./middleware/logger.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  });

  // Middleware para logging
  app.use(loggerMiddleware);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Servidor NestJS iniciado en http://localhost:${port}`);
  console.log(`📊 Endpoint del portfolio: http://localhost:${port}/portfolio`);
  console.log(`💚 Endpoint de salud: http://localhost:${port}/health`);
}

bootstrap();
