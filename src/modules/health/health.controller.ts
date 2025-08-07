import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./health.service";

@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /**
   * Endpoint de salud
   */
  @Get()
  async getHealth() {
    return await this.healthService.getHealth();
  }
}
