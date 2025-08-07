// Re-export all data
export { aboutData } from "./about";
export { skillsData } from "./skills";
export { achievementsData } from "./achievements";
export { languagesData } from "./languages";
export { projectsData } from "./projects";
export { contactData } from "./contact";
export { themeData } from "./theme";

// Re-export types
export type {
  About,
  SkillCategory,
  SkillItem,
  Achievement,
  Language,
  Project,
  ContactInfo,
  PortfolioData,
} from "./types";

// Centralized portfolio data object
import { PortfolioData } from "./types";
import { aboutData } from "./about";
import { skillsData } from "./skills";
import { achievementsData } from "./achievements";
import { languagesData } from "./languages";
import { projectsData } from "./projects";
import { contactData } from "./contact";
import { themeData } from "./theme";

export const portfolioData = {
  about: aboutData,
  skills: skillsData,
  achievements: achievementsData,
  languages: languagesData,
  projects: projectsData,
  contact: contactData,
  theme: themeData,
};
