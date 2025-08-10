// Ejemplo de uso del endpoint PUT /portfolio/:userId/about
// Este endpoint permite actualizar la información personal (about) de un usuario

const axios = require("axios");

const BASE_URL = "http://localhost:3001";
const USER_ID = "808ceb8b-8da6-440c-952d-2d5c23b070e0"; // ID del usuario a actualizar

// Datos de ejemplo para actualizar la información about
const aboutData = {
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

// Función para actualizar la información about
async function updateAbout() {
  try {
    console.log("🔄 Actualizando información about...");

    const response = await axios.put(
      `${BASE_URL}/portfolio/${USER_ID}/about`,
      aboutData,
      {
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE' // Opcional
        },
      }
    );

    console.log("✅ Información actualizada exitosamente");
    console.log("Status:", response.status);
    console.log("Respuesta:", JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    console.error("❌ Error al actualizar la información:");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Mensaje:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }

    throw error;
  }
}

// Función para obtener el portfolio completo después de la actualización
async function getPortfolio() {
  try {
    console.log("\n📋 Obteniendo portfolio completo...");

    const response = await axios.get(`${BASE_URL}/portfolio/${USER_ID}`);

    console.log("✅ Portfolio obtenido exitosamente");
    console.log(
      "About actualizado:",
      JSON.stringify(response.data.about, null, 2)
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener el portfolio:");
    console.error("Error:", error.message);
    throw error;
  }
}

// Ejecutar el ejemplo
async function runExample() {
  try {
    console.log("🚀 Ejemplo de uso del endpoint PUT /portfolio/:userId/about");
    console.log("=".repeat(60));

    // Actualizar la información about
    await updateAbout();

    // Obtener el portfolio completo para verificar los cambios
    await getPortfolio();

    console.log("\n🎉 Ejemplo completado exitosamente");
  } catch (error) {
    console.error("\n💥 Error en el ejemplo:", error.message);
  }
}

// Ejecutar si el archivo se ejecuta directamente
if (require.main === module) {
  runExample();
}

module.exports = { updateAbout, getPortfolio };
