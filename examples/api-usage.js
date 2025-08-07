// Ejemplos de uso de la API del Portfolio
// Base URL de la API
const API_BASE_URL = "http://localhost:3001/api";

// Función helper para hacer peticiones HTTP
async function fetchAPI(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Ejemplos de uso de los diferentes endpoints

// 1. Obtener todos los datos del portfolio
async function getPortfolioData() {
  console.log("📊 Obteniendo todos los datos del portfolio...");
  const data = await fetchAPI("/portfolio");
  console.log("Datos completos:", data);
  return data;
}

// 2. Obtener información personal
async function getAboutInfo() {
  console.log("👤 Obteniendo información personal...");
  const about = await fetchAPI("/about");
  console.log("Información personal:", about);
  return about;
}

// 3. Obtener todas las habilidades
async function getAllSkills() {
  console.log("🛠️ Obteniendo todas las habilidades...");
  const skills = await fetchAPI("/skills");
  console.log("Habilidades:", skills);
  return skills;
}

// 4. Obtener habilidades de una categoría específica
async function getSkillsByCategory(category) {
  console.log(`🔧 Obteniendo habilidades de ${category}...`);
  const skills = await fetchAPI(`/skills/${category}`);
  console.log(`Habilidades de ${category}:`, skills);
  return skills;
}

// 5. Obtener todos los proyectos
async function getAllProjects() {
  console.log("📁 Obteniendo todos los proyectos...");
  const projects = await fetchAPI("/projects");
  console.log("Proyectos:", projects);
  return projects;
}

// 6. Obtener un proyecto específico por ID
async function getProjectById(id) {
  console.log(`📂 Obteniendo proyecto ${id}...`);
  const project = await fetchAPI(`/projects/${id}`);
  console.log(`Proyecto ${id}:`, project);
  return project;
}

// 7. Buscar proyectos por tecnología
async function searchProjectsByTechnology(technology) {
  console.log(`🔍 Buscando proyectos que usen ${technology}...`);
  const searchResults = await fetchAPI(
    `/search/projects?technology=${encodeURIComponent(technology)}`
  );
  console.log(`Resultados para ${technology}:`, searchResults);
  return searchResults;
}

// 8. Obtener logros
async function getAchievements() {
  console.log("🏆 Obteniendo logros...");
  const achievements = await fetchAPI("/achievements");
  console.log("Logros:", achievements);
  return achievements;
}

// 9. Obtener idiomas
async function getLanguages() {
  console.log("🌍 Obteniendo idiomas...");
  const languages = await fetchAPI("/languages");
  console.log("Idiomas:", languages);
  return languages;
}

// 10. Obtener información de contacto
async function getContactInfo() {
  console.log("📞 Obteniendo información de contacto...");
  const contact = await fetchAPI("/contact");
  console.log("Contacto:", contact);
  return contact;
}

// 11. Obtener configuración del tema
async function getThemeConfig() {
  console.log("🎨 Obteniendo configuración del tema...");
  const theme = await fetchAPI("/theme");
  console.log("Tema:", theme);
  return theme;
}

// Función para ejecutar todos los ejemplos
async function runAllExamples() {
  console.log("🚀 Iniciando ejemplos de uso de la API del Portfolio\n");

  try {
    // Ejecutar ejemplos secuencialmente
    await getAboutInfo();
    console.log("---\n");

    await getAllSkills();
    console.log("---\n");

    await getSkillsByCategory("frontend");
    console.log("---\n");

    await getAllProjects();
    console.log("---\n");

    await getProjectById("project-1");
    console.log("---\n");

    await searchProjectsByTechnology("React");
    console.log("---\n");

    await getAchievements();
    console.log("---\n");

    await getLanguages();
    console.log("---\n");

    await getContactInfo();
    console.log("---\n");

    await getThemeConfig();
    console.log("---\n");

    console.log("✅ Todos los ejemplos ejecutados correctamente!");
  } catch (error) {
    console.error("❌ Error ejecutando ejemplos:", error);
  }
}

// Ejemplo de uso con React/Vue/Angular
class PortfolioAPI {
  constructor(baseURL = "http://localhost:3001/api") {
    this.baseURL = baseURL;
  }

  async getPortfolio() {
    return await fetchAPI("/portfolio");
  }

  async getAbout() {
    return await fetchAPI("/about");
  }

  async getSkills(category = null) {
    const endpoint = category ? `/skills/${category}` : "/skills";
    return await fetchAPI(endpoint);
  }

  async getProjects(id = null) {
    const endpoint = id ? `/projects/${id}` : "/projects";
    return await fetchAPI(endpoint);
  }

  async searchProjects(technology) {
    return await fetchAPI(
      `/search/projects?technology=${encodeURIComponent(technology)}`
    );
  }

  async getAchievements() {
    return await fetchAPI("/achievements");
  }

  async getLanguages() {
    return await fetchAPI("/languages");
  }

  async getContact() {
    return await fetchAPI("/contact");
  }

  async getTheme() {
    return await fetchAPI("/theme");
  }
}

// Exportar para uso en módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PortfolioAPI,
    fetchAPI,
    getPortfolioData,
    getAboutInfo,
    getAllSkills,
    getSkillsByCategory,
    getAllProjects,
    getProjectById,
    searchProjectsByTechnology,
    getAchievements,
    getLanguages,
    getContactInfo,
    getThemeConfig,
    runAllExamples,
  };
}

// Ejecutar ejemplos si se ejecuta directamente
if (typeof window !== "undefined") {
  // En el navegador
  window.PortfolioAPI = PortfolioAPI;
  window.runAllExamples = runAllExamples;
} else if (typeof process !== "undefined") {
  // En Node.js
  console.log("Para ejecutar los ejemplos, llama a runAllExamples()");
}
