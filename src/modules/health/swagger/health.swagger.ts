import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

export function HealthTag() {
  return applyDecorators(ApiTags("Health"));
}

export function GetHealthDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Verificar salud del sistema",
      description: "Retorna el estado de salud de la aplicación",
    }),
    ApiResponse({
      status: 200,
      description: "Sistema funcionando correctamente",
      schema: {
        type: "object",
        properties: {
          status: { type: "string", example: "ok" },
          timestamp: { type: "string", example: "2025-08-07T10:30:00.000Z" },
          uptime: { type: "number", example: 123.456 },
        },
      },
    })
  );
}
