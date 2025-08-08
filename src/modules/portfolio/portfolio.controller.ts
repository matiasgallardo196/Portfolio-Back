import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { PortfolioService } from "./portfolio.service";
import { PortfolioResponseDto } from "../../dto/portfolio.dto";

@ApiTags("Portfolio")
@Controller()
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  /**
   * Obtiene todos los datos del portfolio de un usuario específico
   */
  @ApiOperation({
    summary: "Obtener portfolio completo por usuario",
    description:
      "Retorna toda la información del portfolio de un usuario específico incluyendo about, skills, achievements, languages, projects y contact",
  })
  @ApiParam({
    name: "userId",
    description: "ID único del usuario",
    example: "808ceb8b-8da6-440c-952d-2d5c23b070e0",
  })
  @ApiResponse({
    status: 200,
    description: "Portfolio obtenido exitosamente",
    type: PortfolioResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Usuario no encontrado",
  })
  @Get("portfolio/:userId")
  async getPortfolioByUserId(@Param("userId") userId: string) {
    return await this.portfolioService.getPortfolioByUserId(userId);
  }

  /**
   * Obtiene todos los datos del portfolio (endpoint legacy)
   */
  @ApiOperation({
    summary: "Obtener portfolio legacy",
    description:
      "Endpoint legacy que retorna datos del portfolio desde archivos estáticos",
  })
  @ApiResponse({
    status: 200,
    description: "Datos del portfolio obtenidos exitosamente",
  })
  @Get("portfolio")
  async getAllPortfolioData() {
    return await this.portfolioService.getAllPortfolioData();
  }

  /**
   * Obtiene información personal
   */
  @ApiOperation({
    summary: "Obtener información personal",
    description: "Retorna la información personal del portfolio",
  })
  @ApiResponse({
    status: 200,
    description: "Información personal obtenida exitosamente",
  })
  @Get("about")
  async getAboutInfo() {
    return await this.portfolioService.getAboutInfo();
  }

  /**
   * Obtiene todas las habilidades
   */
  @ApiOperation({
    summary: "Obtener todas las habilidades",
    description: "Retorna todas las habilidades organizadas por categorías",
  })
  @ApiResponse({
    status: 200,
    description: "Habilidades obtenidas exitosamente",
  })
  @Get("skills")
  async getAllSkills() {
    return await this.portfolioService.getAllSkills();
  }

  /**
   * Obtiene habilidades por categoría
   */
  @ApiOperation({
    summary: "Obtener habilidades por categoría",
    description: "Retorna las habilidades de una categoría específica",
  })
  @ApiParam({
    name: "category",
    description: "Categoría de habilidades",
    example: "frontend",
  })
  @ApiResponse({
    status: 200,
    description: "Habilidades de la categoría obtenidas exitosamente",
  })
  @ApiResponse({
    status: 404,
    description: "Categoría no encontrada",
  })
  @Get("skills/:category")
  async getSkillsByCategory(@Param("category") category: string) {
    return await this.portfolioService.getSkillsByCategory(category);
  }

  /**
   * Obtiene todos los proyectos
   */
  @ApiOperation({
    summary: "Obtener todos los proyectos",
    description: "Retorna todos los proyectos del portfolio",
  })
  @ApiResponse({
    status: 200,
    description: "Proyectos obtenidos exitosamente",
  })
  @Get("projects")
  async getAllProjects() {
    return await this.portfolioService.getAllProjects();
  }

  /**
   * Obtiene un proyecto específico por ID
   */
  @ApiOperation({
    summary: "Obtener proyecto por ID",
    description: "Retorna un proyecto específico por su ID",
  })
  @ApiParam({
    name: "id",
    description: "ID único del proyecto",
    example: "project-1",
  })
  @ApiResponse({
    status: 200,
    description: "Proyecto obtenido exitosamente",
  })
  @ApiResponse({
    status: 404,
    description: "Proyecto no encontrado",
  })
  @Get("projects/:id")
  async getProjectById(@Param("id") id: string) {
    return await this.portfolioService.getProjectById(id);
  }

  /**
   * Busca proyectos por tecnología
   */
  @ApiOperation({
    summary: "Buscar proyectos por tecnología",
    description: "Busca proyectos que utilicen una tecnología específica",
  })
  @ApiQuery({
    name: "technology",
    description: "Tecnología a buscar",
    example: "React",
  })
  @ApiResponse({
    status: 200,
    description: "Proyectos encontrados exitosamente",
  })
  @ApiResponse({
    status: 400,
    description: "Parámetro de tecnología requerido",
  })
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
  @ApiOperation({
    summary: "Obtener todos los logros",
    description: "Retorna todos los logros del portfolio",
  })
  @ApiResponse({
    status: 200,
    description: "Logros obtenidos exitosamente",
  })
  @Get("achievements")
  async getAchievements() {
    return await this.portfolioService.getAchievements();
  }

  /**
   * Obtiene información de idiomas
   */
  @ApiOperation({
    summary: "Obtener información de idiomas",
    description: "Retorna la información de idiomas del portfolio",
  })
  @ApiResponse({
    status: 200,
    description: "Información de idiomas obtenida exitosamente",
  })
  @Get("languages")
  async getLanguages() {
    return await this.portfolioService.getLanguages();
  }

  /**
   * Obtiene información de contacto
   */
  @ApiOperation({
    summary: "Obtener información de contacto",
    description: "Retorna la información de contacto del portfolio",
  })
  @ApiResponse({
    status: 200,
    description: "Información de contacto obtenida exitosamente",
  })
  @Get("contact")
  async getContactInfo() {
    return await this.portfolioService.getContactInfo();
  }

  /**
   * Obtiene configuración del tema
   */
  @ApiOperation({
    summary: "Obtener configuración del tema",
    description: "Retorna la configuración del tema del portfolio",
  })
  @ApiResponse({
    status: 200,
    description: "Configuración del tema obtenida exitosamente",
  })
  @Get("theme")
  async getThemeConfig() {
    return await this.portfolioService.getThemeConfig();
  }

  /**
   * Obtiene estadísticas del portfolio
   */
  @ApiOperation({
    summary: "Obtener estadísticas del portfolio",
    description: "Retorna estadísticas generales del portfolio",
  })
  @ApiResponse({
    status: 200,
    description: "Estadísticas obtenidas exitosamente",
  })
  @Get("stats")
  async getPortfolioStats() {
    return await this.portfolioService.getPortfolioStats();
  }
}
