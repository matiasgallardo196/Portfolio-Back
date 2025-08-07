import { Injectable } from "@nestjs/common";
import { PortfolioService } from "../portfolio/portfolio.service";

@Injectable()
export class HealthService {
  constructor(private readonly portfolioService: PortfolioService) {}

  /**
   * Obtiene el estado de salud del servidor
   */
  async getHealth() {
    const stats = await this.portfolioService.getPortfolioStats();

    return {
      status: "OK",
      message: "Servidor funcionando correctamente",
      timestamp: new Date().toISOString(),
      endpoints: {
        portfolio: "/portfolio",
        about: "/about",
        skills: "/skills",
        projects: "/projects",
        achievements: "/achievements",
        languages: "/languages",
        contact: "/contact",
        theme: "/theme",
        search: "/search/projects",
        stats: "/stats",
      },
      stats,
    };
  }
}
