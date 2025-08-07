import { Module } from "@nestjs/common";
import { HealthModule } from "./modules/health/health.module";
import { PortfolioModule } from "./modules/portfolio/portfolio.module";

@Module({
  imports: [HealthModule, PortfolioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
