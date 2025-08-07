import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
} from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";

@Controller()
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  /**
   * Obtiene todos los datos del portfolio
   */
  @Get("portfolio")
  async getAllPortfolioData() {
    return await this.portfolioService.getAllPortfolioData();
  }

  /**
   * Obtiene información personal
   */
  @Get("about")
  async getAboutInfo() {
    return await this.portfolioService.getAboutInfo();
  }

  /**
   * Obtiene todas las habilidades
   */
  @Get("skills")
  async getAllSkills() {
    return await this.portfolioService.getAllSkills();
  }

  /**
   * Obtiene habilidades por categoría
   */
  @Get("skills/:category")
  async getSkillsByCategory(@Param("category") category: string) {
    return await this.portfolioService.getSkillsByCategory(category);
  }

  /**
   * Obtiene todos los proyectos
   */
  @Get("projects")
  async getAllProjects() {
    return await this.portfolioService.getAllProjects();
  }

  /**
   * Obtiene un proyecto específico por ID
   */
  @Get("projects/:id")
  async getProjectById(@Param("id") id: string) {
    return await this.portfolioService.getProjectById(id);
  }

  /**
   * Busca proyectos por tecnología
   */
  @Get("search/projects")
  async searchProjectsByTechnology(@Query("technology") technology: string) {
    if (!technology) {
      throw new BadRequestException();
    }

    return await this.portfolioService.searchProjectsByTechnology(technology);
  }

  /**
   * Obtiene todos los logros
   */
  @Get("achievements")
  async getAchievements() {
    return await this.portfolioService.getAchievements();
  }

  /**
   * Obtiene información de idiomas
   */
  @Get("languages")
  async getLanguages() {
    return await this.portfolioService.getLanguages();
  }

  /**
   * Obtiene información de contacto
   */
  @Get("contact")
  async getContactInfo() {
    return await this.portfolioService.getContactInfo();
  }

  /**
   * Obtiene configuración del tema
   */
  @Get("theme")
  async getThemeConfig() {
    return await this.portfolioService.getThemeConfig();
  }

  /**
   * Obtiene estadísticas del portfolio
   */
  @Get("stats")
  async getPortfolioStats() {
    return await this.portfolioService.getPortfolioStats();
  }
}
