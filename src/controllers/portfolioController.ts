import { Request, Response } from "express";
import { portfolioService } from "../services/portfolioService";

export class PortfolioController {
  /**
   * Obtiene todos los datos del portfolio
   */
  getAllPortfolioData = async (req: Request, res: Response) => {
    try {
      const data = await portfolioService.getAllPortfolioData();
      res.json(data);
    } catch (error) {
      console.error("Error al obtener datos del portfolio:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudieron obtener los datos del portfolio",
      });
    }
  };

  /**
   * Obtiene información personal
   */
  getAboutInfo = async (req: Request, res: Response) => {
    try {
      const about = await portfolioService.getAboutInfo();
      res.json(about);
    } catch (error) {
      console.error("Error al obtener datos de about:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudieron obtener los datos personales",
      });
    }
  };

  /**
   * Obtiene todas las habilidades
   */
  getAllSkills = async (req: Request, res: Response) => {
    try {
      const skills = await portfolioService.getAllSkills();
      res.json(skills);
    } catch (error) {
      console.error("Error al obtener datos de skills:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudieron obtener las habilidades",
      });
    }
  };

  /**
   * Obtiene habilidades por categoría
   */
  getSkillsByCategory = async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const skills = await portfolioService.getSkillsByCategory(category);
      res.json(skills);
    } catch (error) {
      console.error("Error al obtener habilidades por categoría:", error);

      if (error instanceof Error && error.message.includes("no encontrada")) {
        const availableCategories =
          await portfolioService.getAvailableSkillCategories();
        return res.status(404).json({
          error: "Categoría no encontrada",
          message: error.message,
          availableCategories,
        });
      }

      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudieron obtener las habilidades de la categoría",
      });
    }
  };

  /**
   * Obtiene todos los proyectos
   */
  getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await portfolioService.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error al obtener datos de projects:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudieron obtener los proyectos",
      });
    }
  };

  /**
   * Obtiene un proyecto específico por ID
   */
  getProjectById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await portfolioService.getProjectById(id);
      res.json(project);
    } catch (error) {
      console.error("Error al obtener proyecto específico:", error);

      if (error instanceof Error && error.message.includes("no encontrado")) {
        const allProjects = await portfolioService.getAllProjects();
        return res.status(404).json({
          error: "Proyecto no encontrado",
          message: error.message,
          availableProjects: allProjects.map((p) => ({
            id: p.id,
            title: p.title,
          })),
        });
      }

      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudo obtener el proyecto",
      });
    }
  };

  /**
   * Busca proyectos por tecnología
   */
  searchProjectsByTechnology = async (req: Request, res: Response) => {
    try {
      const { technology } = req.query;

      if (!technology || typeof technology !== "string") {
        return res.status(400).json({
          error: "Parámetro requerido",
          message: "El parámetro 'technology' es requerido para la búsqueda",
        });
      }

      const searchResults = await portfolioService.searchProjectsByTechnology(
        technology
      );
      res.json(searchResults);
    } catch (error) {
      console.error("Error en búsqueda de proyectos:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudo realizar la búsqueda",
      });
    }
  };

  /**
   * Obtiene todos los logros
   */
  getAchievements = async (req: Request, res: Response) => {
    try {
      const achievements = await portfolioService.getAchievements();
      res.json(achievements);
    } catch (error) {
      console.error("Error al obtener datos de achievements:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudieron obtener los logros",
      });
    }
  };

  /**
   * Obtiene información de idiomas
   */
  getLanguages = async (req: Request, res: Response) => {
    try {
      const languages = await portfolioService.getLanguages();
      res.json(languages);
    } catch (error) {
      console.error("Error al obtener datos de languages:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudieron obtener los idiomas",
      });
    }
  };

  /**
   * Obtiene información de contacto
   */
  getContactInfo = async (req: Request, res: Response) => {
    try {
      const contact = await portfolioService.getContactInfo();
      res.json(contact);
    } catch (error) {
      console.error("Error al obtener datos de contact:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudieron obtener los datos de contacto",
      });
    }
  };

  /**
   * Obtiene configuración del tema
   */
  getThemeConfig = async (req: Request, res: Response) => {
    try {
      const theme = await portfolioService.getThemeConfig();
      res.json(theme);
    } catch (error) {
      console.error("Error al obtener datos de theme:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudieron obtener la configuración del tema",
      });
    }
  };

  /**
   * Obtiene estadísticas del portfolio
   */
  getPortfolioStats = async (req: Request, res: Response) => {
    try {
      const stats = await portfolioService.getPortfolioStats();
      res.json(stats);
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudieron obtener las estadísticas",
      });
    }
  };

  /**
   * Endpoint de salud
   */
  getHealth = async (req: Request, res: Response) => {
    try {
      const stats = await portfolioService.getPortfolioStats();
      res.json({
        status: "OK",
        message: "Servidor funcionando correctamente",
        timestamp: new Date().toISOString(),
        endpoints: {
          portfolio: "/api/portfolio",
          about: "/api/about",
          skills: "/api/skills",
          projects: "/api/projects",
          achievements: "/api/achievements",
          languages: "/api/languages",
          contact: "/api/contact",
          theme: "/api/theme",
          search: "/api/search/projects",
          stats: "/api/stats",
        },
        stats,
      });
    } catch (error) {
      console.error("Error en endpoint de salud:", error);
      res.status(500).json({
        status: "ERROR",
        message: "Error interno del servidor",
        timestamp: new Date().toISOString(),
      });
    }
  };
}

// Instancia singleton del controlador
export const portfolioController = new PortfolioController();
