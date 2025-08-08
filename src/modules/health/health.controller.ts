import { Controller, Get } from "@nestjs/common";
import { HealthTag, GetHealthDocs } from "./swagger/health.swagger";
import { HealthService } from "./health.service";

@HealthTag()
@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /**
   * Endpoint de salud
   */
  @GetHealthDocs()
  @Get()
  async getHealth() {
    return await this.healthService.getHealth();
  }
}
