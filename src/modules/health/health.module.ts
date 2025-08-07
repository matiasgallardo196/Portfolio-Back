import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";
import { PortfolioModule } from "../portfolio/portfolio.module";

@Module({
  imports: [PortfolioModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
