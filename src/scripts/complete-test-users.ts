import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { DatabaseService } from "../modules/database/database.service";
import { SkillCategory } from "../entities";
import { contactData as defaultContactData } from "../../data/contact";

async function completeTestUsers() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const databaseService = app.get(DatabaseService);

  const userIds = [
    "5d849759-5b8b-4d6e-aa64-e4ed8bee8930", // Backend Developer
    "853d9702-1800-4392-a00a-74ac54defd69", // Frontend Developer
    "961c60d6-068c-40f8-9d5f-16a662c82963", // Data Scientist
    "bbb735cf-ef78-47ac-a234-61f88e97925b", // DevOps Engineer
  ];

  try {
    console.log("🔧 Completando datos de usuarios de prueba...\n");

    for (const userId of userIds) {
      console.log(`\n📋 Completando usuario: ${userId}`);
      console.log("=".repeat(50));

      // Obtener el usuario y sus skills existentes
      const user = await databaseService.getUserById(userId);
      if (!user) {
        console.log("❌ Usuario no encontrado, saltando...");
        continue;
      }

      const existingSkills = await databaseService.getSkillsByUserId(userId);
      console.log(`✅ Usuario encontrado: ${user.username}`);

      // Crear proyectos según el tipo de usuario
      console.log("\n🚀 Creando proyectos...");

      if (user.username === "frontend-dev") {
        // Proyectos Frontend
        const frontendProjects = [
          {
            title: "E-commerce React App",
            description:
              "Aplicación de comercio electrónico desarrollada con React, Redux y Styled Components. Incluye carrito de compras, gestión de usuarios y panel de administración.",
            githubUrl: "https://github.com/frontend-dev/ecommerce-react",
            demoUrl: "https://ecommerce-react-demo.vercel.app",
            imageUrl: "/projects/ecommerce-react.jpg",
            userId: userId,
          },
          {
            title: "Portfolio Personal Vue.js",
            description:
              "Portfolio personal desarrollado con Vue.js 3, Composition API y TailwindCSS. Diseño responsivo y animaciones fluidas.",
            githubUrl: "https://github.com/frontend-dev/portfolio-vue",
            demoUrl: "https://portfolio-vue-demo.netlify.app",
            imageUrl: "/projects/portfolio-vue.jpg",
            userId: userId,
          },
          {
            title: "Dashboard Angular Material",
            description:
              "Dashboard administrativo construido con Angular 15 y Angular Material. Incluye gráficos, tablas dinámicas y autenticación.",
            githubUrl: "https://github.com/frontend-dev/angular-dashboard",
            demoUrl: "https://angular-dashboard-demo.herokuapp.com",
            imageUrl: "/projects/angular-dashboard.jpg",
            userId: userId,
          },
        ];

        for (const projectData of frontendProjects) {
          const project = await databaseService.createProject(projectData);
          console.log(`   ✅ Proyecto creado: ${project.title}`);
        }
      }

      if (user.username === "backend-dev") {
        // Proyectos Backend
        const backendProjects = [
          {
            title: "API REST Spring Boot",
            description:
              "API REST completa desarrollada con Spring Boot, Spring Security y JWT. Incluye autenticación, autorización y documentación con Swagger.",
            githubUrl: "https://github.com/backend-dev/spring-api",
            demoUrl: "https://spring-api-demo.herokuapp.com",
            imageUrl: "/projects/spring-api.jpg",
            userId: userId,
          },
          {
            title: "Microservicios Kotlin",
            description:
              "Arquitectura de microservicios desarrollada con Kotlin, Spring Cloud y Docker. Incluye service discovery, load balancing y circuit breakers.",
            githubUrl: "https://github.com/backend-dev/kotlin-microservices",
            demoUrl: "https://kotlin-microservices-demo.com",
            imageUrl: "/projects/kotlin-microservices.jpg",
            userId: userId,
          },
          {
            title: "Sistema de Notificaciones",
            description:
              "Sistema de notificaciones en tiempo real con WebSockets, Redis y MongoDB. Escalable y con alta disponibilidad.",
            githubUrl: "https://github.com/backend-dev/notification-system",
            demoUrl: "https://notification-system-demo.com",
            imageUrl: "/projects/notification-system.jpg",
            userId: userId,
          },
        ];

        for (const projectData of backendProjects) {
          const project = await databaseService.createProject(projectData);
          console.log(`   ✅ Proyecto creado: ${project.title}`);
        }
      }

      if (user.username === "data-scientist") {
        // Proyectos Data Science
        const dataProjects = [
          {
            title: "Modelo de Predicción de Ventas",
            description:
              "Modelo de machine learning para predecir ventas utilizando Random Forest y XGBoost. Análisis exploratorio de datos y visualizaciones interactivas.",
            githubUrl: "https://github.com/data-scientist/sales-prediction",
            demoUrl: "https://sales-prediction-demo.streamlit.app",
            imageUrl: "/projects/sales-prediction.jpg",
            userId: userId,
          },
          {
            title: "Análisis de Sentimientos Twitter",
            description:
              "Análisis de sentimientos en tiempo real de tweets usando NLP y deep learning. Pipeline completo de procesamiento de datos.",
            githubUrl: "https://github.com/data-scientist/sentiment-analysis",
            demoUrl: "https://sentiment-analysis-demo.herokuapp.com",
            imageUrl: "/projects/sentiment-analysis.jpg",
            userId: userId,
          },
          {
            title: "Dashboard de Datos COVID-19",
            description:
              "Dashboard interactivo para visualizar datos de COVID-19 usando Plotly y Dash. Actualización automática de datos y múltiples visualizaciones.",
            githubUrl: "https://github.com/data-scientist/covid-dashboard",
            demoUrl: "https://covid-dashboard-demo.herokuapp.com",
            imageUrl: "/projects/covid-dashboard.jpg",
            userId: userId,
          },
        ];

        for (const projectData of dataProjects) {
          const project = await databaseService.createProject(projectData);
          console.log(`   ✅ Proyecto creado: ${project.title}`);
        }
      }

      if (user.username === "devops-engineer") {
        // Proyectos DevOps
        const devopsProjects = [
          {
            title: "Infraestructura como Código Terraform",
            description:
              "Infraestructura completa en AWS gestionada con Terraform. Incluye VPC, EC2, RDS, Load Balancers y auto-scaling.",
            githubUrl: "https://github.com/devops-engineer/terraform-aws",
            demoUrl: "https://terraform-aws-demo.com",
            imageUrl: "/projects/terraform-aws.jpg",
            userId: userId,
          },
          {
            title: "Pipeline CI/CD Jenkins",
            description:
              "Pipeline completo de integración y despliegue continuo con Jenkins, Docker y Kubernetes. Automatización de testing y deployment.",
            githubUrl: "https://github.com/devops-engineer/jenkins-pipeline",
            demoUrl: "https://jenkins-pipeline-demo.com",
            imageUrl: "/projects/jenkins-pipeline.jpg",
            userId: userId,
          },
          {
            title: "Monitoreo con Prometheus y Grafana",
            description:
              "Sistema de monitoreo completo con Prometheus, Grafana y AlertManager. Métricas personalizadas y dashboards interactivos.",
            githubUrl: "https://github.com/devops-engineer/monitoring-stack",
            demoUrl: "https://monitoring-stack-demo.com",
            imageUrl: "/projects/monitoring-stack.jpg",
            userId: userId,
          },
        ];

        for (const projectData of devopsProjects) {
          const project = await databaseService.createProject(projectData);
          console.log(`   ✅ Proyecto creado: ${project.title}`);
        }
      }

      // Crear logros
      console.log("\n🏆 Creando logros...");
      const achievements = [
        {
          description:
            "Desarrollé y desplegué una aplicación web que procesa más de 10,000 transacciones diarias, mejorando la eficiencia del negocio en un 40%.",
          userId: userId,
        },
        {
          description:
            "Lideré un equipo de 5 desarrolladores en la migración exitosa de una aplicación legacy a una arquitectura moderna de microservicios.",
          userId: userId,
        },
        {
          description:
            "Implementé un sistema de CI/CD que redujo el tiempo de deployment de 2 horas a 15 minutos, aumentando la productividad del equipo.",
          userId: userId,
        },
        {
          description:
            "Optimicé el rendimiento de una base de datos que manejaba 1M+ registros, reduciendo los tiempos de consulta en un 70%.",
          userId: userId,
        },
      ];

      for (const achievement of achievements) {
        await databaseService.createAchievement(achievement);
      }
      console.log(`   ✅ ${achievements.length} logros creados`);

      // Crear idiomas
      console.log("\n🌍 Creando idiomas...");
      const languages = [
        { name: "Español", level: "Nativo", isNative: true, userId: userId },
        { name: "Inglés", level: "Avanzado", isNative: false, userId: userId },
        {
          name: "Francés",
          level: "Intermedio",
          isNative: false,
          userId: userId,
        },
      ];

      for (const language of languages) {
        await databaseService.createLanguage(language);
      }
      console.log(`   ✅ ${languages.length} idiomas creados`);

      // Crear/actualizar datos de contacto con opportunities y locationInfo
      console.log("\n📞 Creando datos de contacto...");
      const existingContact = await databaseService.getContactByUserId(userId);
      const allSkillsForUser = await databaseService.getSkillsByUserId(userId);

      // Asegurar skills para opportunities
      const ensuredOpportunities = [] as any[];
      for (const opp of defaultContactData.opportunities) {
        let skill = allSkillsForUser.find((s) => s.name === opp.name);
        if (!skill) {
          skill = await databaseService.createSkill({
            name: opp.name,
            category: SkillCategory.PRACTICES,
            userId,
          });
        }
        ensuredOpportunities.push(skill);
      }

      // Asegurar skills para locationInfo
      const ensuredLocationInfo = [] as any[];
      for (const loc of defaultContactData.locationInfo) {
        let skill = allSkillsForUser.find((s) => s.name === loc.name);
        if (!skill) {
          skill = await databaseService.createSkill({
            name: loc.name,
            category: SkillCategory.PRACTICES,
            userId,
          });
        }
        ensuredLocationInfo.push(skill);
      }

      const contactData = {
        email: user.email,
        linkedin: `https://linkedin.com/in/${user.username}`,
        github: `https://github.com/${user.username}`,
        whatsapp: `+34 600 000 000`,
        metaDescription: `Portfolio profesional de ${user.username} - Desarrollador especializado`,
        pageTitle: `Contacto - ${user.username}`,
        heroTitle: "Hablemos",
        letsTalkTitle: "¿Tienes un proyecto en mente?",
        letsTalkDescription:
          "Estoy siempre interesado en nuevas oportunidades y proyectos desafiantes. Si tienes una idea o proyecto que te gustaría discutir, no dudes en contactarme.",
        availabilityTitle: "Disponibilidad",
        currentStatusTitle: "Estado Actual",
        locationTitle: "Ubicación",
        userId: userId,
        opportunities: ensuredOpportunities,
        locationInfo: ensuredLocationInfo,
      } as any;

      if (!existingContact) {
        await databaseService.createContact(contactData);
        console.log(
          "   ✅ Datos de contacto creados (con opportunities y locationInfo)"
        );
      } else {
        await databaseService.updateContact(
          existingContact.id,
          contactData as any
        );
        console.log(
          "   ✅ Datos de contacto actualizados (con opportunities y locationInfo)"
        );
      }

      console.log("\n" + "=".repeat(50));
    }

    console.log("\n🎉 ¡Datos completados exitosamente!");
    console.log("\n🔗 Endpoints disponibles para testing:");
    userIds.forEach((userId) => {
      console.log(`   GET http://localhost:3001/portfolio/${userId}`);
    });
  } catch (error) {
    console.error("❌ Error completando usuarios:", error);
  } finally {
    await app.close();
  }
}

completeTestUsers();
