export interface About {
  fullName: string;
  location: string;
  biography: string;
  pageDescription: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  avatarUrl: string;
  relocationStatus: string;
  ctaButtons: {
    projects: string;
    contact: string;
  };
  stats: {
    projects: {
      title: string;
      subtitle: string;
    };
    technologies: {
      title: string;
      subtitle: string;
    };
    languages: {
      title: string;
      subtitle: string;
    };
  };
}

export interface SkillItem {
  id: string;
  name: string;
}

export interface SkillCategory {
  languages: SkillItem[];
  frontend: SkillItem[];
  backend: SkillItem[];
  databases: SkillItem[];
  devops: SkillItem[];
  integrations: SkillItem[];
  practices: SkillItem[];
}

export interface Achievement {
  id: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
  isNative?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: SkillItem[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  whatsapp?: string;
  metaDescription: string;
  pageTitle: string;
  heroTitle: string;
  letsTalkTitle: string;
  letsTalkDescription: string;
  availabilityTitle: string;
  currentStatusTitle: string;
  opportunities: SkillItem[];
  locationTitle: string;
  locationInfo: SkillItem[];
}

// Import ThemeData interface from theme.ts
import { ThemeData } from "./theme";

export interface PortfolioData {
  about: About;
  skills: SkillCategory;
  achievements: Achievement[];
  languages: Language[];
  projects: Project[];
  contact: ContactInfo;
  theme: ThemeData;
}
