import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { DatabaseService } from "../modules/database/database.service";
import { SkillCategory } from "../entities";

async function createTestUsers() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const databaseService = app.get(DatabaseService);

  try {
    console.log("👥 Creando usuarios de prueba...");

    // Usuario 1: Desarrollador Frontend
    console.log("\n🎨 Creando usuario Frontend Developer...");
    const frontendUser = await databaseService.createUser({
      email: "frontend@dev.com",
      username: "frontend-dev",
      password: "hashed-password-123",
    });

    await databaseService.createAbout({
      fullName: "Ana García",
      location: "Madrid, España",
      biography:
        "Desarrolladora Frontend apasionada por crear experiencias de usuario excepcionales. Especializada en React, Vue.js y diseño responsivo.",
      pageDescription: "Portfolio de Ana García - Desarrolladora Frontend",
      metaDescription:
        "Desarrolladora Frontend especializada en React, Vue.js y UX/UI. Basada en Madrid, España.",
      heroTitle: "Frontend Developer",
      heroSubtitle: "UX/UI Enthusiast",
      avatarUrl: "/avatar-ana.jpg",
      relocationStatus: "Open to relocate",
      ctaButtons: { projects: "Ver Proyectos", contact: "Contactar" },
      stats: {
        projects: {
          title: "Proyectos Frontend",
          subtitle: "Experiencias digitales",
        },
        technologies: {
          title: "Tecnologías Frontend",
          subtitle: "Stack moderno",
        },
        languages: { title: "Idiomas", subtitle: "Comunicación global" },
      },
      userId: frontendUser.id,
    });

    // Skills para Frontend Developer
    const frontendSkills = [
      { name: "JavaScript", category: SkillCategory.LANGUAGES },
      { name: "TypeScript", category: SkillCategory.LANGUAGES },
      { name: "React", category: SkillCategory.FRONTEND },
      { name: "Vue.js", category: SkillCategory.FRONTEND },
      { name: "Angular", category: SkillCategory.FRONTEND },
      { name: "CSS3", category: SkillCategory.FRONTEND },
      { name: "Sass", category: SkillCategory.FRONTEND },
      { name: "TailwindCSS", category: SkillCategory.FRONTEND },
      { name: "Figma", category: SkillCategory.FRONTEND },
      { name: "Webpack", category: SkillCategory.DEVOPS },
      { name: "Vite", category: SkillCategory.DEVOPS },
      { name: "Git", category: SkillCategory.DEVOPS },
    ];

    for (const skill of frontendSkills) {
      await databaseService.createSkill({
        ...skill,
        userId: frontendUser.id,
      });
    }

    // Usuario 2: Desarrollador Backend
    console.log("\n⚙️ Creando usuario Backend Developer...");
    const backendUser = await databaseService.createUser({
      email: "backend@dev.com",
      username: "backend-dev",
      password: "hashed-password-123",
    });

    await databaseService.createAbout({
      fullName: "Carlos Rodríguez",
      location: "Barcelona, España",
      biography:
        "Desarrollador Backend con experiencia en arquitecturas escalables y microservicios. Especializado en Java, Spring Boot y bases de datos.",
      pageDescription: "Portfolio de Carlos Rodríguez - Desarrollador Backend",
      metaDescription:
        "Desarrollador Backend especializado en Java, Spring Boot y microservicios. Basado en Barcelona, España.",
      heroTitle: "Backend Developer",
      heroSubtitle: "Scalable Architectures",
      avatarUrl: "/avatar-carlos.jpg",
      relocationStatus: "Remote only",
      ctaButtons: { projects: "Ver Proyectos", contact: "Contactar" },
      stats: {
        projects: {
          title: "APIs Desarrolladas",
          subtitle: "Sistemas robustos",
        },
        technologies: {
          title: "Tecnologías Backend",
          subtitle: "Stack empresarial",
        },
        languages: { title: "Idiomas", subtitle: "Comunicación técnica" },
      },
      userId: backendUser.id,
    });

    // Skills para Backend Developer
    const backendSkills = [
      { name: "Java", category: SkillCategory.LANGUAGES },
      { name: "Kotlin", category: SkillCategory.LANGUAGES },
      { name: "Spring Boot", category: SkillCategory.BACKEND },
      { name: "Spring Security", category: SkillCategory.BACKEND },
      { name: "Maven", category: SkillCategory.DEVOPS },
      { name: "Gradle", category: SkillCategory.DEVOPS },
      { name: "PostgreSQL", category: SkillCategory.DATABASES },
      { name: "MongoDB", category: SkillCategory.DATABASES },
      { name: "Redis", category: SkillCategory.DATABASES },
      { name: "Docker", category: SkillCategory.DEVOPS },
      { name: "Kubernetes", category: SkillCategory.DEVOPS },
      { name: "AWS", category: SkillCategory.DEVOPS },
      { name: "JUnit", category: SkillCategory.PRACTICES },
      { name: "TDD", category: SkillCategory.PRACTICES },
    ];

    for (const skill of backendSkills) {
      await databaseService.createSkill({
        ...skill,
        userId: backendUser.id,
      });
    }

    // Usuario 3: DevOps Engineer
    console.log("\n🛠️ Creando usuario DevOps Engineer...");
    const devopsUser = await databaseService.createUser({
      email: "devops@engineer.com",
      username: "devops-engineer",
      password: "hashed-password-123",
    });

    await databaseService.createAbout({
      fullName: "Laura Martínez",
      location: "Valencia, España",
      biography:
        "DevOps Engineer con experiencia en automatización, CI/CD y gestión de infraestructura cloud. Especializada en AWS, Kubernetes y Terraform.",
      pageDescription: "Portfolio de Laura Martínez - DevOps Engineer",
      metaDescription:
        "DevOps Engineer especializada en AWS, Kubernetes y automatización. Basada en Valencia, España.",
      heroTitle: "DevOps Engineer",
      heroSubtitle: "Infrastructure Automation",
      avatarUrl: "/avatar-laura.jpg",
      relocationStatus: "Hybrid",
      ctaButtons: { projects: "Ver Proyectos", contact: "Contactar" },
      stats: {
        projects: {
          title: "Infraestructuras",
          subtitle: "Sistemas automatizados",
        },
        technologies: { title: "Herramientas DevOps", subtitle: "Stack cloud" },
        languages: { title: "Idiomas", subtitle: "Comunicación técnica" },
      },
      userId: devopsUser.id,
    });

    // Skills para DevOps Engineer
    const devopsSkills = [
      { name: "Python", category: SkillCategory.LANGUAGES },
      { name: "Bash", category: SkillCategory.LANGUAGES },
      { name: "Terraform", category: SkillCategory.DEVOPS },
      { name: "Ansible", category: SkillCategory.DEVOPS },
      { name: "Jenkins", category: SkillCategory.DEVOPS },
      { name: "GitLab CI", category: SkillCategory.DEVOPS },
      { name: "Docker", category: SkillCategory.DEVOPS },
      { name: "Kubernetes", category: SkillCategory.DEVOPS },
      { name: "AWS", category: SkillCategory.DEVOPS },
      { name: "Azure", category: SkillCategory.DEVOPS },
      { name: "Prometheus", category: SkillCategory.DEVOPS },
      { name: "Grafana", category: SkillCategory.DEVOPS },
      { name: "ELK Stack", category: SkillCategory.DEVOPS },
      { name: "Linux", category: SkillCategory.DEVOPS },
    ];

    for (const skill of devopsSkills) {
      await databaseService.createSkill({
        ...skill,
        userId: devopsUser.id,
      });
    }

    // Usuario 4: Data Scientist
    console.log("\n📊 Creando usuario Data Scientist...");
    const dataUser = await databaseService.createUser({
      email: "data@scientist.com",
      username: "data-scientist",
      password: "hashed-password-123",
    });

    await databaseService.createAbout({
      fullName: "Miguel Fernández",
      location: "Sevilla, España",
      biography:
        "Data Scientist con experiencia en machine learning, análisis de datos y visualización. Especializado en Python, R y herramientas de big data.",
      pageDescription: "Portfolio de Miguel Fernández - Data Scientist",
      metaDescription:
        "Data Scientist especializado en machine learning y análisis de datos. Basado en Sevilla, España.",
      heroTitle: "Data Scientist",
      heroSubtitle: "Machine Learning Expert",
      avatarUrl: "/avatar-miguel.jpg",
      relocationStatus: "Open to relocate",
      ctaButtons: { projects: "Ver Proyectos", contact: "Contactar" },
      stats: {
        projects: { title: "Modelos ML", subtitle: "Soluciones de datos" },
        technologies: {
          title: "Herramientas de Datos",
          subtitle: "Stack analítico",
        },
        languages: { title: "Idiomas", subtitle: "Comunicación científica" },
      },
      userId: dataUser.id,
    });

    // Skills para Data Scientist
    const dataSkills = [
      { name: "Python", category: SkillCategory.LANGUAGES },
      { name: "R", category: SkillCategory.LANGUAGES },
      { name: "SQL", category: SkillCategory.LANGUAGES },
      { name: "Pandas", category: SkillCategory.INTEGRATIONS },
      { name: "NumPy", category: SkillCategory.INTEGRATIONS },
      { name: "Scikit-learn", category: SkillCategory.INTEGRATIONS },
      { name: "TensorFlow", category: SkillCategory.INTEGRATIONS },
      { name: "PyTorch", category: SkillCategory.INTEGRATIONS },
      { name: "Matplotlib", category: SkillCategory.INTEGRATIONS },
      { name: "Seaborn", category: SkillCategory.INTEGRATIONS },
      { name: "Jupyter", category: SkillCategory.INTEGRATIONS },
      { name: "PostgreSQL", category: SkillCategory.DATABASES },
      { name: "MongoDB", category: SkillCategory.DATABASES },
      { name: "Apache Spark", category: SkillCategory.DEVOPS },
      { name: "Docker", category: SkillCategory.DEVOPS },
    ];

    for (const skill of dataSkills) {
      await databaseService.createSkill({
        ...skill,
        userId: dataUser.id,
      });
    }

    console.log("\n🎉 ¡Usuarios de prueba creados exitosamente!");
    console.log("\n📋 Resumen de usuarios creados:");
    console.log(`   👩‍🎨 Frontend Developer: ${frontendUser.id}`);
    console.log(`   👨‍💻 Backend Developer: ${backendUser.id}`);
    console.log(`   👩‍🔧 DevOps Engineer: ${devopsUser.id}`);
    console.log(`   👨‍🔬 Data Scientist: ${dataUser.id}`);

    console.log("\n🔗 Endpoints disponibles:");
    console.log(`   GET /portfolio/${frontendUser.id} - Frontend Developer`);
    console.log(`   GET /portfolio/${backendUser.id} - Backend Developer`);
    console.log(`   GET /portfolio/${devopsUser.id} - DevOps Engineer`);
    console.log(`   GET /portfolio/${dataUser.id} - Data Scientist`);
  } catch (error) {
    console.error("❌ Error creando usuarios de prueba:", error);
  } finally {
    await app.close();
  }
}

createTestUsers();
