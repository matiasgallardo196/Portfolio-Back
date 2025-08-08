import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { PORT, CORS_ORIGIN } from "./config/env.loader";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: CORS_ORIGIN,
    credentials: true,
  });

  // Middleware para logging
  app.use(loggerMiddleware);

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle("Portfolio API")
    .setDescription(
      "API para gestionar portfolios de desarrolladores con múltiples usuarios"
    )
    .setVersion("1.0")
    .addTag("Portfolio", "Endpoints relacionados con portfolios de usuarios")
    .addTag("Health", "Endpoints de salud del sistema")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
  });

  await app.listen(PORT);

  console.log(`🚀 Servidor NestJS iniciado en http://localhost:${PORT}`);
  console.log(`📊 Endpoint del portfolio: http://localhost:${PORT}/portfolio`);
  console.log(`💚 Endpoint de salud: http://localhost:${PORT}/health`);
  console.log(`📚 Documentación Swagger: http://localhost:${PORT}/api`);
}

bootstrap();
