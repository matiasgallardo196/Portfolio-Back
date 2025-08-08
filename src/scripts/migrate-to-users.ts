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

async function migrateToUsers() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const databaseService = app.get(DatabaseService);

  try {
    console.log("🔄 Iniciando migración a sistema de usuarios...");

    // 1. Crear usuario por defecto si no existe
    console.log("👤 Verificando usuario por defecto...");
    let defaultUser = await databaseService.getUserByEmail(
      "default@portfolio.com"
    );
    if (!defaultUser) {
      defaultUser = await databaseService.createUser({
        email: "default@portfolio.com",
        username: "default-user",
        password: "hashed-password-123",
      });
      console.log("✅ Usuario creado:", defaultUser.id);
    } else {
      console.log("ℹ️ Usuario ya existe:", defaultUser.id);
    }

    // 2. Crear About con userId (si no existe)
    console.log("📝 Creando About...");
    const existingAbout = await databaseService.getAboutByUserId(
      defaultUser.id
    );
    if (!existingAbout) {
      await databaseService.createAbout({
        ...aboutData,
        userId: defaultUser.id,
      });
      console.log("✅ About creado");
    } else {
      console.log("ℹ️ About ya existe");
    }

    // 3. Crear Skills con userId (idempotente)
    console.log("🛠️ Creando Skills...");
    for (const category in skillsData) {
      for (const skill of skillsData[category as keyof typeof skillsData]) {
        const existing = (
          await databaseService.getSkillsByCategoryAndUserId(
            defaultUser.id,
            category as any
          )
        ).find((s) => s.name === skill.name);
        if (!existing) {
          await databaseService.createSkill({
            name: skill.name,
            category: category as any,
            userId: defaultUser.id,
          });
        }
      }
    }
    console.log("✅ Skills creadas");

    // 4. Crear Achievements con userId (idempotente)
    console.log("🏆 Creando Achievements...");
    for (const achievement of achievementsData) {
      const existing = (
        await databaseService.getAchievementsByUserId(defaultUser.id)
      ).find((a) => a.description === achievement.description);
      if (!existing) {
        await databaseService.createAchievement({
          description: achievement.description,
          userId: defaultUser.id,
        });
      }
    }
    console.log("✅ Achievements creados");

    // 5. Crear Languages con userId (idempotente)
    console.log("🌍 Creando Languages...");
    for (const language of languagesData) {
      const existing = (
        await databaseService.getLanguagesByUserId(defaultUser.id)
      ).find((l) => l.name === language.name && l.level === language.level);
      if (!existing) {
        await databaseService.createLanguage({
          name: language.name,
          level: language.level,
          isNative: language.isNative,
          userId: defaultUser.id,
        });
      }
    }
    console.log("✅ Languages creados");

    // 6. Crear Projects con userId y technologies (idempotente por título)
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

      const existing = (
        await databaseService.getProjectsByUserId(defaultUser.id)
      ).find((p) => p.title === project.title);
      if (!existing) {
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
    }
    console.log("✅ Projects creados");

    // 7. Crear/actualizar Contact con userId y skills (idempotente)
    console.log("📞 Creando Contact...");
    const existingContact = await databaseService.getContactByUserId(
      defaultUser.id
    );
    const opportunitySkills = await Promise.all(
      contactData.opportunities.map(async (opp) => {
        const allSkills = await databaseService.getSkillsByUserId(
          defaultUser.id
        );
        let skill = allSkills.find((s) => s.name === opp.name);
        if (!skill) {
          skill = await databaseService.createSkill({
            name: opp.name,
            category: SkillCategory.PRACTICES,
            userId: defaultUser.id,
          });
        }
        return skill;
      })
    );
    const locationSkills = await Promise.all(
      contactData.locationInfo.map(async (loc) => {
        const allSkills = await databaseService.getSkillsByUserId(
          defaultUser.id
        );
        let skill = allSkills.find((s) => s.name === loc.name);
        if (!skill) {
          skill = await databaseService.createSkill({
            name: loc.name,
            category: SkillCategory.PRACTICES,
            userId: defaultUser.id,
          });
        }
        return skill;
      })
    );
    const validOpportunities = opportunitySkills.filter(
      (skill) => skill !== undefined
    );
    const validLocationInfo = locationSkills.filter(
      (skill) => skill !== undefined
    );
    if (!existingContact) {
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
    } else {
      await databaseService.updateContact(existingContact.id, {
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
      console.log("✅ Contact actualizado");
    }

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
