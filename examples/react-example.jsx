import React, { useState, useEffect } from "react";

// Clase para manejar las llamadas a la API
class PortfolioAPI {
  constructor(baseURL = "http://localhost:3001/api") {
    this.baseURL = baseURL;
  }

  async fetchAPI(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async getPortfolio() {
    return await this.fetchAPI("/portfolio");
  }

  async getAbout() {
    return await this.fetchAPI("/about");
  }

  async getSkills(category = null) {
    const endpoint = category ? `/skills/${category}` : "/skills";
    return await this.fetchAPI(endpoint);
  }

  async getProjects(id = null) {
    const endpoint = id ? `/projects/${id}` : "/projects";
    return await this.fetchAPI(endpoint);
  }

  async searchProjects(technology) {
    return await this.fetchAPI(
      `/search/projects?technology=${encodeURIComponent(technology)}`
    );
  }

  async getAchievements() {
    return await this.fetchAPI("/achievements");
  }

  async getLanguages() {
    return await this.fetchAPI("/languages");
  }

  async getContact() {
    return await this.fetchAPI("/contact");
  }

  async getTheme() {
    return await this.fetchAPI("/theme");
  }
}

// Instancia global de la API
const api = new PortfolioAPI();

// Hook personalizado para manejar el estado de carga y errores
function usePortfolioAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { loading, error, fetchData };
}

// Componente para mostrar información personal
function AboutSection() {
  const [about, setAbout] = useState(null);
  const { loading, error, fetchData } = usePortfolioAPI();

  useEffect(() => {
    fetchData(() => api.getAbout())
      .then(setAbout)
      .catch(console.error);
  }, []);

  if (loading) return <div>Cargando información personal...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!about) return null;

  return (
    <section>
      <h2>{about.heroTitle}</h2>
      <h3>{about.heroSubtitle}</h3>
      <p>
        <strong>Ubicación:</strong> {about.location}
      </p>
      <p>
        <strong>Estado de reubicación:</strong> {about.relocationStatus}
      </p>
      <p>{about.biography}</p>
      <div>
        <button>{about.ctaButtons.projects}</button>
        <button>{about.ctaButtons.contact}</button>
      </div>
    </section>
  );
}

// Componente para mostrar habilidades
function SkillsSection() {
  const [skills, setSkills] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { loading, error, fetchData } = usePortfolioAPI();

  useEffect(() => {
    fetchData(() => api.getSkills())
      .then(setSkills)
      .catch(console.error);
  }, []);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      fetchData(() => api.getSkills())
        .then(setSkills)
        .catch(console.error);
    } else {
      fetchData(() => api.getSkills(category))
        .then(setSkills)
        .catch(console.error);
    }
  };

  if (loading) return <div>Cargando habilidades...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!skills) return null;

  const categories = [
    "all",
    "languages",
    "frontend",
    "backend",
    "databases",
    "devops",
    "integrations",
    "practices",
  ];

  return (
    <section>
      <h2>Habilidades</h2>
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={selectedCategory === category ? "active" : ""}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div>
        {Array.isArray(skills)
          ? // Si es un array (categoría específica)
            skills.map((skill) => (
              <span key={skill.id} className="skill-tag">
                {skill.name}
              </span>
            ))
          : // Si es un objeto (todas las categorías)
            Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                {skillList.map((skill) => (
                  <span key={skill.id} className="skill-tag">
                    {skill.name}
                  </span>
                ))}
              </div>
            ))}
      </div>
    </section>
  );
}

// Componente para mostrar proyectos
function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, fetchData } = usePortfolioAPI();

  useEffect(() => {
    fetchData(() => api.getProjects())
      .then(setProjects)
      .catch(console.error);
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchData(() => api.getProjects())
        .then(setProjects)
        .catch(console.error);
      return;
    }

    try {
      const searchResults = await fetchData(() =>
        api.searchProjects(searchTerm)
      );
      setProjects(searchResults.results);
    } catch (err) {
      console.error("Error en búsqueda:", err);
    }
  };

  if (loading) return <div>Cargando proyectos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h2>Proyectos</h2>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por tecnología..."
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div>
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div>
              <strong>Tecnologías:</strong>
              {project.technologies.map((tech) => (
                <span key={tech.id} className="tech-tag">
                  {tech.name}
                </span>
              ))}
            </div>
            <div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en GitHub
              </a>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Componente principal
function PortfolioApp() {
  return (
    <div className="portfolio-app">
      <header>
        <h1>Portfolio API Demo</h1>
      </header>
      <main>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </main>
    </div>
  );
}

export default PortfolioApp;
