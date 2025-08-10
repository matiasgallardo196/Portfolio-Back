// Ejemplo de uso del endpoint PUT /portfolio/:userId/about en React
// Este componente muestra cómo actualizar la información about desde el frontend

import React, { useState } from "react";
import axios from "axios";

const UpdateAboutForm = ({ userId, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    biography: "",
    pageDescription: "",
    metaDescription: "",
    heroTitle: "",
    heroSubtitle: "",
    avatarUrl: "",
    relocationStatus: "",
    ctaButtons: {
      projects: "",
      contact: "",
    },
    stats: {
      projects: {
        title: "",
        subtitle: "",
      },
      technologies: {
        title: "",
        subtitle: "",
      },
      languages: {
        title: "",
        subtitle: "",
      },
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (parent, child, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.put(
        `http://localhost:3001/portfolio/${userId}/about`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${token}` // Si tienes autenticación
          },
        }
      );

      setSuccess(true);
      if (onUpdate) {
        onUpdate(response.data);
      }

      console.log("✅ Información actualizada:", response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error al actualizar la información"
      );
      console.error("❌ Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-about-form">
      <h2>Actualizar Información Personal</h2>

      {error && <div className="error-message">❌ {error}</div>}

      {success && (
        <div className="success-message">
          ✅ Información actualizada exitosamente
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Información Básica</h3>

          <div className="form-group">
            <label htmlFor="fullName">Nombre Completo *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Ubicación *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="biography">Biografía *</label>
            <textarea
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>SEO y Metadatos</h3>

          <div className="form-group">
            <label htmlFor="pageDescription">Descripción de la Página *</label>
            <input
              type="text"
              id="pageDescription"
              name="pageDescription"
              value={formData.pageDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="metaDescription">Meta Descripción *</label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleInputChange}
              rows="3"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Hero Section</h3>

          <div className="form-group">
            <label htmlFor="heroTitle">Título Principal *</label>
            <input
              type="text"
              id="heroTitle"
              name="heroTitle"
              value={formData.heroTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="heroSubtitle">Subtítulo Principal *</label>
            <input
              type="text"
              id="heroSubtitle"
              name="heroSubtitle"
              value={formData.heroSubtitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatarUrl">URL del Avatar *</label>
            <input
              type="url"
              id="avatarUrl"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="relocationStatus">Estado de Reubicación *</label>
            <input
              type="text"
              id="relocationStatus"
              name="relocationStatus"
              value={formData.relocationStatus}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Botones de Acción</h3>

          <div className="form-group">
            <label htmlFor="ctaProjects">Texto del Botón Proyectos *</label>
            <input
              type="text"
              id="ctaProjects"
              value={formData.ctaButtons.projects}
              onChange={(e) =>
                handleNestedChange("ctaButtons", "projects", e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ctaContact">Texto del Botón Contacto *</label>
            <input
              type="text"
              id="ctaContact"
              value={formData.ctaButtons.contact}
              onChange={(e) =>
                handleNestedChange("ctaButtons", "contact", e.target.value)
              }
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Estadísticas</h3>

          <div className="stats-group">
            <h4>Proyectos</h4>
            <div className="form-group">
              <label htmlFor="statsProjectsTitle">Título *</label>
              <input
                type="text"
                id="statsProjectsTitle"
                value={formData.stats.projects.title}
                onChange={(e) =>
                  handleNestedChange("stats", "projects", {
                    ...formData.stats.projects,
                    title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="statsProjectsSubtitle">Subtítulo *</label>
              <input
                type="text"
                id="statsProjectsSubtitle"
                value={formData.stats.projects.subtitle}
                onChange={(e) =>
                  handleNestedChange("stats", "projects", {
                    ...formData.stats.projects,
                    subtitle: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="stats-group">
            <h4>Tecnologías</h4>
            <div className="form-group">
              <label htmlFor="statsTechnologiesTitle">Título *</label>
              <input
                type="text"
                id="statsTechnologiesTitle"
                value={formData.stats.technologies.title}
                onChange={(e) =>
                  handleNestedChange("stats", "technologies", {
                    ...formData.stats.technologies,
                    title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="statsTechnologiesSubtitle">Subtítulo *</label>
              <input
                type="text"
                id="statsTechnologiesSubtitle"
                value={formData.stats.technologies.subtitle}
                onChange={(e) =>
                  handleNestedChange("stats", "technologies", {
                    ...formData.stats.technologies,
                    subtitle: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="stats-group">
            <h4>Idiomas</h4>
            <div className="form-group">
              <label htmlFor="statsLanguagesTitle">Título *</label>
              <input
                type="text"
                id="statsLanguagesTitle"
                value={formData.stats.languages.title}
                onChange={(e) =>
                  handleNestedChange("stats", "languages", {
                    ...formData.stats.languages,
                    title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="statsLanguagesSubtitle">Subtítulo *</label>
              <input
                type="text"
                id="statsLanguagesSubtitle"
                value={formData.stats.languages.subtitle}
                onChange={(e) =>
                  handleNestedChange("stats", "languages", {
                    ...formData.stats.languages,
                    subtitle: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "🔄 Actualizando..." : "💾 Actualizar Información"}
        </button>
      </form>
    </div>
  );
};

// Componente de ejemplo para cargar datos existentes
const LoadExistingData = ({ userId, onDataLoaded }) => {
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/portfolio/${userId}`
      );
      if (onDataLoaded && response.data.about) {
        onDataLoaded(response.data.about);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={loadData} disabled={loading}>
      {loading ? "🔄 Cargando..." : "📋 Cargar Datos Existentes"}
    </button>
  );
};

// Componente principal de ejemplo
const UpdateAboutExample = () => {
  const [currentData, setCurrentData] = useState(null);
  const userId = "808ceb8b-8da6-440c-952d-2d5c23b070e0"; // ID del usuario

  const handleUpdate = (updatedData) => {
    setCurrentData(updatedData);
    console.log("Portfolio actualizado:", updatedData);
  };

  const handleDataLoaded = (aboutData) => {
    setCurrentData(aboutData);
  };

  return (
    <div className="update-about-example">
      <h1>Ejemplo: Actualizar Información About</h1>

      <div className="actions">
        <LoadExistingData userId={userId} onDataLoaded={handleDataLoaded} />
      </div>

      <UpdateAboutForm userId={userId} onUpdate={handleUpdate} />

      {currentData && (
        <div className="current-data">
          <h3>Datos Actuales</h3>
          <pre>{JSON.stringify(currentData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdateAboutExample;
