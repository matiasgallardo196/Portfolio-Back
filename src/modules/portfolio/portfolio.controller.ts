import { Controller, Get, Param } from "@nestjs/common";
import {
  PortfolioTag,
  GetPortfolioByUserIdDocs,
  GetFixedPortfolioDocs,
} from "./swagger/portfolio.swagger";
import { PortfolioService } from "./portfolio.service";

@PortfolioTag()
@Controller()
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  /**
   * Obtiene todos los datos del portfolio de un usuario específico
   */
  @GetPortfolioByUserIdDocs()
  @Get("portfolio/:userId")
  async getPortfolioByUserId(@Param("userId") userId: string) {
    return await this.portfolioService.getPortfolioByUserId(userId);
  }

  /**
   * Obtiene todos los datos del portfolio para un usuario fijo
   */
  @GetFixedPortfolioDocs()
  @Get("portfolio")
  async getFixedPortfolio() {
    const FIXED_USER_ID = "808ceb8b-8da6-440c-952d-2d5c23b070e0";
    return await this.portfolioService.getPortfolioByUserId(FIXED_USER_ID);
  }
}
