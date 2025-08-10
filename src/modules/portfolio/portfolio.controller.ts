import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import {
  PortfolioTag,
  GetPortfolioByUserIdDocs,
  GetFixedPortfolioDocs,
  UpdateAboutByUserIdDocs,
} from "./swagger/portfolio.swagger";
import { PortfolioService } from "./portfolio.service";
import { UpdateAboutDto } from "../../dto/portfolio.dto";

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

  /**
   * Actualiza la información about de un usuario específico
   */
  @UpdateAboutByUserIdDocs()
  @Put("portfolio/:userId/about")
  async updateAboutByUserId(
    @Param("userId") userId: string,
    @Body() aboutData: UpdateAboutDto
  ) {
    try {
      return await this.portfolioService.updateAboutByUserId(userId, aboutData);
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        "Error interno del servidor",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
