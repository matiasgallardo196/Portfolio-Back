import { portfolioData } from "../../data";
import { PortfolioData, SkillCategory, Project } from "../../data/types";

export class PortfolioService {
  /**
   * Obtiene todos los datos del portfolio
   */
  async getAllPortfolioData(): Promise<PortfolioData> {
    return portfolioData;
  }

  /**
   * Obtiene información personal
   */
  async getAboutInfo() {
    return portfolioData.about;
  }

  /**
   * Obtiene todas las habilidades organizadas por categorías
   */
  async getAllSkills(): Promise<SkillCategory> {
    return portfolioData.skills;
  }

  /**
   * Obtiene habilidades de una categoría específica
   */
  async getSkillsByCategory(category: string) {
    const skills = portfolioData.skills[category as keyof typeof portfolioData.skills];
    
    if (!skills) {
      throw new Error(`Categoría '${category}' no encontrada`);
    }
    
    return skills;
  }

  /**
   * Obtiene todas las categorías de habilidades disponibles
   */
  async getAvailableSkillCategories(): Promise<string[]> {
    return Object.keys(portfolioData.skills);
  }

  /**
   * Obtiene todos los proyectos
   */
  async getAllProjects(): Promise<Project[]> {
    return portfolioData.projects;
  }

  /**
   * Obtiene un proyecto específico por ID
   */
  async getProjectById(id: string): Promise<Project> {
    const project = portfolioData.projects.find((p) => p.id === id);
    
    if (!project) {
      throw new Error(`Proyecto con ID '${id}' no encontrado`);
    }
    
    return project;
  }

  /**
   * Busca proyectos por tecnología
   */
  async searchProjectsByTechnology(technology: string) {
    const filteredProjects = portfolioData.projects.filter((project) =>
      project.technologies.some((tech) =>
        tech.name.toLowerCase().includes(technology.toLowerCase())
      )
    );

    return {
      searchTerm: technology,
      results: filteredProjects,
      totalResults: filteredProjects.length,
    };
  }

  /**
   * Obtiene todos los logros
   */
  async getAchievements() {
    return portfolioData.achievements;
  }

  /**
   * Obtiene información de idiomas
   */
  async getLanguages() {
    return portfolioData.languages;
  }

  /**
   * Obtiene información de contacto
   */
  async getContactInfo() {
    return portfolioData.contact;
  }

  /**
   * Obtiene configuración del tema
   */
  async getThemeConfig() {
    return portfolioData.theme;
  }

  /**
   * Obtiene estadísticas del portfolio
   */
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

// Instancia singleton del servicio
export const portfolioService = new PortfolioService(); 