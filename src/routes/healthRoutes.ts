import { Router } from "express";
import { portfolioController } from "../controllers/portfolioController";

const router = Router();

// Endpoint de salud
router.get("/", portfolioController.getHealth);

export default router; 