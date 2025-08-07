import { Router } from "express";
import { portfolioController } from "../controllers/portfolioController";

const router = Router();

// Rutas principales del portfolio
router.get("/portfolio", portfolioController.getAllPortfolioData);
router.get("/about", portfolioController.getAboutInfo);
router.get("/skills", portfolioController.getAllSkills);
router.get("/skills/:category", portfolioController.getSkillsByCategory);
router.get("/projects", portfolioController.getAllProjects);
router.get("/projects/:id", portfolioController.getProjectById);
router.get("/achievements", portfolioController.getAchievements);
router.get("/languages", portfolioController.getLanguages);
router.get("/contact", portfolioController.getContactInfo);
router.get("/theme", portfolioController.getThemeConfig);
router.get("/stats", portfolioController.getPortfolioStats);

// Rutas de búsqueda
router.get("/search/projects", portfolioController.searchProjectsByTechnology);

export default router; 