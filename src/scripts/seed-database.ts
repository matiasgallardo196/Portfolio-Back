import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { DatabaseService } from "../modules/database/database.service";
import { SkillCategory } from "../entities";
import { aboutData } from "../../data/about";
import { projectsData } from "../../data/projects";
import { skillsData } from "../../data/skills";
import { achievementsData } from "../../data/achievements";
import { languagesData } from "../../data/languages";
import { contactData } from "../../data/contact";

async function seedDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const databaseService = app.get(DatabaseService);

  try {
    console.log("🌱 Iniciando población de la base de datos...");

    // Crear About
    console.log("📝 Creando datos de About...");
    await databaseService.createAbout(aboutData);
    console.log("✅ About creado exitosamente");

    // Crear Skills
    console.log("🛠️ Creando Skills...");
    const allSkills = [
      ...skillsData.languages,
      ...skillsData.frontend,
      ...skillsData.backend,
      ...skillsData.databases,
      ...skillsData.devops,
      ...skillsData.integrations,
      ...skillsData.practices,
    ];

    for (const skill of allSkills) {
      let category: SkillCategory;

      if (skillsData.languages.find((s) => s.id === skill.id)) {
        category = SkillCategory.LANGUAGES;
      } else if (skillsData.frontend.find((s) => s.id === skill.id)) {
        category = SkillCategory.FRONTEND;
      } else if (skillsData.backend.find((s) => s.id === skill.id)) {
        category = SkillCategory.BACKEND;
      } else if (skillsData.databases.find((s) => s.id === skill.id)) {
        category = SkillCategory.DATABASES;
      } else if (skillsData.devops.find((s) => s.id === skill.id)) {
        category = SkillCategory.DEVOPS;
      } else if (skillsData.integrations.find((s) => s.id === skill.id)) {
        category = SkillCategory.INTEGRATIONS;
      } else {
        category = SkillCategory.PRACTICES;
      }

      await databaseService.createSkill({
        id: skill.id,
        name: skill.name,
        category,
      });
    }
    console.log("✅ Skills creados exitosamente");

    // Crear Achievements
    console.log("🏆 Creando Achievements...");
    for (const achievement of achievementsData) {
      await databaseService.createAchievement(achievement);
    }
    console.log("✅ Achievements creados exitosamente");

    // Crear Languages
    console.log("🌍 Creando Languages...");
    for (const language of languagesData) {
      await databaseService.createLanguage(language);
    }
    console.log("✅ Languages creados exitosamente");

    // Crear Projects
    console.log("🚀 Creando Projects...");
    for (const project of projectsData) {
      // Obtener las skills relacionadas
      const technologySkills = await Promise.all(
        project.technologies.map(async (tech) => {
          const allSkills = await databaseService.getAllSkills();
          return allSkills.find((s) => s.name === tech.name);
        })
      );

      const validSkills = technologySkills.filter(
        (skill) => skill !== undefined
      );

      await databaseService.createProject({
        id: project.id,
        title: project.title,
        description: project.description,
        githubUrl: project.githubUrl,
        demoUrl: project.demoUrl,
        imageUrl: project.imageUrl,
        technologies: validSkills,
      });
    }
    console.log("✅ Projects creados exitosamente");

    // Crear Contact
    console.log("📞 Creando Contact...");
    const opportunitySkills = await Promise.all(
      contactData.opportunities.map(async (opp) => {
        const allSkills = await databaseService.getAllSkills();
        return allSkills.find((s) => s.name === opp.name);
      })
    );

    const locationSkills = await Promise.all(
      contactData.locationInfo.map(async (loc) => {
        const allSkills = await databaseService.getAllSkills();
        return allSkills.find((s) => s.name === loc.name);
      })
    );

    const validOpportunities = opportunitySkills.filter(
      (skill) => skill !== undefined
    );
    const validLocationInfo = locationSkills.filter(
      (skill) => skill !== undefined
    );

    await databaseService.createContact({
      email: contactData.email,
      linkedin: contactData.linkedin,
      github: contactData.github,
      whatsapp: contactData.whatsapp,
      metaDescription: contactData.metaDescription,
      pageTitle: contactData.pageTitle,
      heroTitle: contactData.heroTitle,
      letsTalkTitle: contactData.letsTalkTitle,
      letsTalkDescription: contactData.letsTalkDescription,
      availabilityTitle: contactData.availabilityTitle,
      currentStatusTitle: contactData.currentStatusTitle,
      opportunities: validOpportunities,
      locationTitle: contactData.locationTitle,
      locationInfo: validLocationInfo,
    });
    console.log("✅ Contact creado exitosamente");

    console.log("🎉 ¡Base de datos poblada exitosamente!");
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
  } finally {
    await app.close();
  }
}

seedDatabase();
