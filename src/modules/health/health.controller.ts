import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HealthService } from "./health.service";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /**
   * Endpoint de salud
   */
  @ApiOperation({
    summary: "Verificar salud del sistema",
    description: "Retorna el estado de salud de la aplicación",
  })
  @ApiResponse({
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
  @Get()
  async getHealth() {
    return await this.healthService.getHealth();
  }
}
