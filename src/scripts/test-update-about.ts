import axios from "axios";

const BASE_URL = "http://localhost:3001";
const TEST_USER_ID = "808ceb8b-8da6-440c-952d-2d5c23b070e0";

const testUpdateAbout = async () => {
  console.log("🧪 Probando endpoint PUT /portfolio/:userId/about");
  console.log("=".repeat(50));

  const updateData = {
    fullName: "Andrés Ricardo",
    location: "Bogotá, Colombia",
    biography:
      "Desarrollador Full Stack apasionado por crear soluciones innovadoras y escalables. Especializado en tecnologías modernas como React, Node.js y TypeScript.",
    pageDescription:
      "Portfolio personal de Andrés Ricardo - Desarrollador Full Stack",
    metaDescription:
      "Portfolio profesional de Andrés Ricardo, desarrollador Full Stack con experiencia en React, Node.js y tecnologías modernas",
    heroTitle: "Hola, soy Andrés Ricardo",
    heroSubtitle: "Desarrollador Full Stack",
    avatarUrl: "https://example.com/avatar.jpg",
    relocationStatus: "Disponible para reubicación",
    ctaButtons: {
      projects: "Ver Proyectos",
      contact: "Contactar",
    },
    stats: {
      projects: {
        title: "Proyectos",
        subtitle: "Completados",
      },
      technologies: {
        title: "Tecnologías",
        subtitle: "Dominadas",
      },
      languages: {
        title: "Idiomas",
        subtitle: "Hablados",
      },
    },
  };

  try {
    console.log("📤 Enviando petición PUT...");
    console.log("URL:", `${BASE_URL}/portfolio/${TEST_USER_ID}/about`);
    console.log("Datos:", JSON.stringify(updateData, null, 2));

    const response = await axios.put(
      `${BASE_URL}/portfolio/${TEST_USER_ID}/about`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Respuesta exitosa:");
    console.log("Status:", response.status);
    console.log("Datos actualizados:", JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.error("❌ Error en la petición:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Mensaje:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
};

const testInvalidData = async () => {
  console.log("\n🧪 Probando validación con datos inválidos");
  console.log("=".repeat(50));

  const invalidData = {
    fullName: "", // Campo vacío
    location: "Bogotá",
    // Faltan campos obligatorios
  };

  try {
    console.log("📤 Enviando datos inválidos...");
    const response = await axios.put(
      `${BASE_URL}/portfolio/${TEST_USER_ID}/about`,
      invalidData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.log("✅ Validación funcionando correctamente:");
    console.log("Status:", error.response?.status);
    console.log("Mensaje:", error.response?.data);
  }
};

const testNonExistentUser = async () => {
  console.log("\n🧪 Probando con usuario inexistente");
  console.log("=".repeat(50));

  const nonExistentUserId = "00000000-0000-0000-0000-000000000000";
  const updateData = {
    fullName: "Test User",
    location: "Test Location",
    biography: "Test biography",
    pageDescription: "Test page description",
    metaDescription: "Test meta description",
    heroTitle: "Test hero title",
    heroSubtitle: "Test hero subtitle",
    avatarUrl: "https://example.com/test.jpg",
    relocationStatus: "Test status",
    ctaButtons: {
      projects: "Test Projects",
      contact: "Test Contact",
    },
    stats: {
      projects: {
        title: "Test Projects",
        subtitle: "Test Subtitle",
      },
      technologies: {
        title: "Test Technologies",
        subtitle: "Test Subtitle",
      },
      languages: {
        title: "Test Languages",
        subtitle: "Test Subtitle",
      },
    },
  };

  try {
    console.log("📤 Enviando petición con usuario inexistente...");
    const response = await axios.put(
      `${BASE_URL}/portfolio/${nonExistentUserId}/about`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.log("✅ Manejo de usuario inexistente correcto:");
    console.log("Status:", error.response?.status);
    console.log("Mensaje:", error.response?.data);
  }
};

const runTests = async () => {
  console.log("🚀 Iniciando pruebas del endpoint PUT /portfolio/:userId/about");
  console.log("=".repeat(60));

  await testUpdateAbout();
  await testInvalidData();
  await testNonExistentUser();

  console.log("\n🎉 Pruebas completadas");
};

runTests().catch(console.error);
