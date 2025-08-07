import { SkillCategory } from "./types";

export const skillsData: SkillCategory = {
  languages: [
    { id: "lang-1", name: "JavaScript" },
    { id: "lang-2", name: "TypeScript" },
    { id: "lang-3", name: "SQL" },
  ],
  frontend: [
    { id: "frontend-1", name: "React" },
    { id: "frontend-2", name: "Recharts" },
    { id: "frontend-3", name: "HTML" },
    { id: "frontend-4", name: "CSS" },
    { id: "frontend-5", name: "TailwindCSS" },
  ],
  backend: [
    { id: "backend-1", name: "NestJS" },
    { id: "backend-2", name: "Node.js" },
    { id: "backend-3", name: "Express" },
    { id: "backend-4", name: "RESTful APIs" },
  ],
  databases: [
    { id: "db-1", name: "PostgreSQL" },
    { id: "db-2", name: "MongoDB" },
  ],
  devops: [
    { id: "devops-1", name: "Docker" },
    { id: "devops-2", name: "Vercel" },
    { id: "devops-3", name: "Render" },
    { id: "devops-4", name: "Supabase" },
    { id: "devops-5", name: "Git" },
    { id: "devops-6", name: "GitHub" },
  ],
  integrations: [
    { id: "integration-1", name: "Auth0" },
    { id: "integration-2", name: "Stripe" },
    { id: "integration-3", name: "Nodemailer" },
    { id: "integration-4", name: "Cloudinary" },
    { id: "integration-5", name: "OpenAI" },
  ],
  practices: [
    { id: "practice-1", name: "Testing" },
    { id: "practice-2", name: "Access Control" },
    { id: "practice-3", name: "Validation" },
    { id: "practice-4", name: "Multi-Tenant Architecture" },
  ],
};
