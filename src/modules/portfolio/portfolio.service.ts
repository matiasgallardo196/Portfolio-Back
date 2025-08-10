import { Injectable } from "@nestjs/common";
import { portfolioData } from "../../../data";
import { SkillCategory, Project } from "../../../data/types";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class PortfolioService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Obtiene todos los datos del portfolio de un usuario específico
   */
  async getPortfolioByUserId(userId: string) {
    return await this.databaseService.getPortfolioByUserId(userId);
  }

  /**
   * Actualiza la información about de un usuario específico
   */
  async updateAboutByUserId(userId: string, aboutData: any) {
    // Verificar que el usuario existe
    const user = await this.databaseService.getUserById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Actualizar la información about
    await this.databaseService.updateAboutByUserId(userId, aboutData);

    // Retornar el portfolio completo actualizado
    return await this.databaseService.getPortfolioByUserId(userId);
  }

  // eliminado endpoint legacy getAllPortfolioData

  // Estadísticas del portfolio (consumido por Health; usa datos mock)
  async getPortfolioStats() {
    return {
      totalProjects: portfolioData.projects.length,
      totalSkills: Object.values(portfolioData.skills).flat().length,
      totalAchievements: portfolioData.achievements.length,
      totalLanguages: portfolioData.languages.length,
      skillCategories: Object.keys(portfolioData.skills).length,
    };
  }
}
