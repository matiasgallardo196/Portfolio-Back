import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { DatabaseService } from "../modules/database/database.service";
import { aboutData } from "../../data/about";
import { projectsData } from "../../data/projects";
import { skillsData } from "../../data/skills";
import { achievementsData } from "../../data/achievements";
import { languagesData } from "../../data/languages";
import { contactData } from "../../data/contact";

async function migrateToUsers() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const databaseService = app.get(DatabaseService);

  try {
    console.log("🔄 Iniciando migración a sistema de usuarios...");

    // 1. Crear usuario por defecto
    console.log("👤 Creando usuario por defecto...");
    const defaultUser = await databaseService.createUser({
      email: "default@portfolio.com",
      username: "default-user",
      password: "hashed-password-123",
    });
    console.log("✅ Usuario creado:", defaultUser.id);

    // 2. Crear About con userId
    console.log("📝 Creando About...");
    await databaseService.createAbout({
      ...aboutData,
      userId: defaultUser.id,
    });
    console.log("✅ About creado");

    // 3. Crear Skills con userId
    console.log("🛠️ Creando Skills...");
    for (const category in skillsData) {
      for (const skill of skillsData[category as keyof typeof skillsData]) {
        await databaseService.createSkill({
          name: skill.name,
          category: category as any,
          userId: defaultUser.id,
        });
      }
    }
    console.log("✅ Skills creadas");

    // 4. Crear Achievements con userId
    console.log("🏆 Creando Achievements...");
    for (const achievement of achievementsData) {
      await databaseService.createAchievement({
        description: achievement.description,
        userId: defaultUser.id,
      });
    }
    console.log("✅ Achievements creados");

    // 5. Crear Languages con userId
    console.log("🌍 Creando Languages...");
    for (const language of languagesData) {
      await databaseService.createLanguage({
        name: language.name,
        level: language.level,
        isNative: language.isNative,
        userId: defaultUser.id,
      });
    }
    console.log("✅ Languages creados");

    // 6. Crear Projects con userId y technologies
    console.log("🚀 Creando Projects...");
    for (const project of projectsData) {
      const technologySkills = await Promise.all(
        project.technologies.map(async (tech) => {
          const allSkills = await databaseService.getSkillsByUserId(
            defaultUser.id
          );
          return allSkills.find((s) => s.name === tech.name);
        })
      );
      const validSkills = technologySkills.filter(
        (skill) => skill !== undefined
      );

      await databaseService.createProject({
        title: project.title,
        description: project.description,
        githubUrl: project.githubUrl,
        demoUrl: project.demoUrl,
        imageUrl: project.imageUrl,
        userId: defaultUser.id,
        technologies: validSkills,
      });
    }
    console.log("✅ Projects creados");

    // 7. Crear Contact con userId y skills
    console.log("📞 Creando Contact...");
    const opportunitySkills = await Promise.all(
      contactData.opportunities.map(async (opp) => {
        const allSkills = await databaseService.getSkillsByUserId(
          defaultUser.id
        );
        return allSkills.find((s) => s.name === opp.name);
      })
    );
    const locationSkills = await Promise.all(
      contactData.locationInfo.map(async (loc) => {
        const allSkills = await databaseService.getSkillsByUserId(
          defaultUser.id
        );
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
      userId: defaultUser.id,
      opportunities: validOpportunities,
      locationTitle: contactData.locationTitle,
      locationInfo: validLocationInfo,
    });
    console.log("✅ Contact creado");

    console.log("🎉 ¡Migración completada exitosamente!");
    console.log(`📊 Usuario por defecto ID: ${defaultUser.id}`);
    console.log(`🔗 Endpoint: GET /portfolio/${defaultUser.id}`);
  } catch (error) {
    console.error("❌ Error durante la migración:", error);
  } finally {
    await app.close();
  }
}

migrateToUsers();
