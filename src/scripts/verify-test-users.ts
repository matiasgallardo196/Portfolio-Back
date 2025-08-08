import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { DatabaseService } from "../modules/database/database.service";

async function verifyTestUsers() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const databaseService = app.get(DatabaseService);

  const userIds = [
    "5d849759-5b8b-4d6e-aa64-e4ed8bee8930",
    "853d9702-1800-4392-a00a-74ac54defd69",
    "961c60d6-068c-40f8-9d5f-16a662c82963",
    "bbb735cf-ef78-47ac-a234-61f88e97925b",
  ];

  try {
    console.log("🔍 Verificando usuarios de prueba...\n");

    for (const userId of userIds) {
      console.log(`\n📋 Verificando usuario: ${userId}`);
      console.log("=".repeat(50));

      // Verificar User
      const user = await databaseService.getUserById(userId);
      if (user) {
        console.log("✅ Usuario encontrado:");
        console.log(`   ID: ${user.id}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Username: ${user.username}`);
        console.log(`   Activo: ${user.isActive}`);
        console.log(`   Creado: ${user.createdAt}`);
        console.log(`   Actualizado: ${user.updatedAt}`);
      } else {
        console.log("❌ Usuario NO encontrado");
        continue;
      }

      // Verificar About
      const about = await databaseService.getAboutByUserId(userId);
      if (about) {
        console.log("\n✅ Datos About encontrados:");
        console.log(`   Nombre completo: ${about.fullName}`);
        console.log(`   Ubicación: ${about.location}`);
        console.log(`   Biografía: ${about.biography.substring(0, 50)}...`);
        console.log(`   Título hero: ${about.heroTitle}`);
        console.log(`   Subtítulo hero: ${about.heroSubtitle}`);
        console.log(`   Avatar: ${about.avatarUrl}`);
        console.log(`   Estado de reubicación: ${about.relocationStatus}`);
        console.log(`   CTA Projects: ${about.ctaButtons.projects}`);
        console.log(`   CTA Contact: ${about.ctaButtons.contact}`);
        console.log(`   Stats Projects: ${about.stats.projects.title}`);
        console.log(`   Stats Technologies: ${about.stats.technologies.title}`);
        console.log(`   Stats Languages: ${about.stats.languages.title}`);
      } else {
        console.log("\n❌ Datos About NO encontrados");
      }

      // Verificar Skills
      const skills = await databaseService.getSkillsByUserId(userId);
      if (skills && skills.length > 0) {
        console.log(`\n✅ Skills encontrados (${skills.length}):`);
        const skillsByCategory = skills.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill.name);
          return acc;
        }, {});

        Object.entries(skillsByCategory).forEach(([category, skillNames]) => {
          console.log(`   ${category}: ${(skillNames as string[]).join(", ")}`);
        });
      } else {
        console.log("\n❌ Skills NO encontrados");
      }

      // Verificar Projects
      const projects = await databaseService.getProjectsByUserId(userId);
      if (projects && projects.length > 0) {
        console.log(`\n✅ Proyectos encontrados (${projects.length}):`);
        projects.forEach((project, index) => {
          console.log(`   ${index + 1}. ${project.title}`);
          console.log(
            `      Descripción: ${project.description.substring(0, 50)}...`
          );
          console.log(`      GitHub: ${project.githubUrl}`);
          console.log(`      Demo: ${project.demoUrl || "No disponible"}`);
          console.log(`      Imagen: ${project.imageUrl}`);
          if (project.technologies && project.technologies.length > 0) {
            console.log(
              `      Tecnologías: ${project.technologies.map((t) => t.name).join(", ")}`
            );
          }
        });
      } else {
        console.log("\n❌ Proyectos NO encontrados");
      }

      // Verificar Achievements
      const achievements =
        await databaseService.getAchievementsByUserId(userId);
      if (achievements && achievements.length > 0) {
        console.log(`\n✅ Logros encontrados (${achievements.length}):`);
        achievements.forEach((achievement, index) => {
          console.log(
            `   ${index + 1}. ${achievement.description.substring(0, 80)}...`
          );
        });
      } else {
        console.log("\n❌ Logros NO encontrados");
      }

      // Verificar Languages
      const languages = await databaseService.getLanguagesByUserId(userId);
      if (languages && languages.length > 0) {
        console.log(`\n✅ Idiomas encontrados (${languages.length}):`);
        languages.forEach((language) => {
          console.log(
            `   ${language.name}: ${language.level}${language.isNative ? " (Nativo)" : ""}`
          );
        });
      } else {
        console.log("\n❌ Idiomas NO encontrados");
      }

      // Verificar Contact
      const contact = await databaseService.getContactByUserId(userId);
      if (contact) {
        console.log("\n✅ Datos de contacto encontrados:");
        console.log(`   Email: ${contact.email}`);
        console.log(`   LinkedIn: ${contact.linkedin}`);
        console.log(`   GitHub: ${contact.github}`);
        console.log(`   WhatsApp: ${contact.whatsapp || "No disponible"}`);
        console.log(`   Título página: ${contact.pageTitle}`);
        console.log(`   Título hero: ${contact.heroTitle}`);
        console.log(`   Título "Hablemos": ${contact.letsTalkTitle}`);
        console.log(
          `   Descripción "Hablemos": ${contact.letsTalkDescription.substring(0, 50)}...`
        );
        console.log(`   Título disponibilidad: ${contact.availabilityTitle}`);
        console.log(`   Título estado actual: ${contact.currentStatusTitle}`);
        console.log(`   Título ubicación: ${contact.locationTitle}`);

        if (contact.opportunities && contact.opportunities.length > 0) {
          console.log(
            `   Oportunidades: ${contact.opportunities.map((o) => o.name).join(", ")}`
          );
        }

        if (contact.locationInfo && contact.locationInfo.length > 0) {
          console.log(
            `   Info ubicación: ${contact.locationInfo.map((l) => l.name).join(", ")}`
          );
        }
      } else {
        console.log("\n❌ Datos de contacto NO encontrados");
      }

      console.log("\n" + "=".repeat(50));
    }

    console.log("\n🎉 Verificación completada!");
  } catch (error) {
    console.error("❌ Error verificando usuarios:", error);
  } finally {
    await app.close();
  }
}

verifyTestUsers();
