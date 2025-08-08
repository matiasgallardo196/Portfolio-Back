import { Module } from "@nestjs/common";
import { HealthModule } from "./modules/health/health.module";
import { PortfolioModule } from "./modules/portfolio/portfolio.module";
import { DatabaseModule } from "./modules/database/database.module";

@Module({
  imports: [DatabaseModule, HealthModule, PortfolioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
