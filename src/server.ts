import express from "express";
import cors from "cors";
import portfolioRoutes from "./routes/portfolioRoutes";
import healthRoutes from "./routes/healthRoutes";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler, notFound } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de logging
app.use(requestLogger);

// Configuración de CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Redirecciones para rutas comunes
app.get("/", (req, res) => {
  res.json({
    message: "API del Portfolio - Matias Gallardo",
    version: "1.0.0",
    documentation: "Consulta /health para ver todos los endpoints disponibles",
    endpoints: {
      portfolio: "/api/portfolio",
      health: "/health",
      stats: "/api/stats",
    },
  });
});

// Redirecciones para rutas sin /api
app.get("/portfolio", (req, res) => {
  res.redirect(301, "/api/portfolio");
});

app.get("/about", (req, res) => {
  res.redirect(301, "/api/about");
});

app.get("/skills", (req, res) => {
  res.redirect(301, "/api/skills");
});

app.get("/projects", (req, res) => {
  res.redirect(301, "/api/projects");
});

app.get("/achievements", (req, res) => {
  res.redirect(301, "/api/achievements");
});

app.get("/languages", (req, res) => {
  res.redirect(301, "/api/languages");
});

app.get("/contact", (req, res) => {
  res.redirect(301, "/api/contact");
});

app.get("/theme", (req, res) => {
  res.redirect(301, "/api/theme");
});

app.get("/stats", (req, res) => {
  res.redirect(301, "/api/stats");
});

// Rutas principales
app.use("/api", portfolioRoutes);
app.use("/health", healthRoutes);

// Middleware para rutas no encontradas
app.use(notFound);

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
  console.log(
    `📊 Endpoint del portfolio: http://localhost:${PORT}/api/portfolio`
  );
  console.log(`💚 Endpoint de salud: http://localhost:${PORT}/health`);
  console.log(
    `📈 Endpoint de estadísticas: http://localhost:${PORT}/api/stats`
  );
  console.log(`🔍 Endpoints específicos disponibles:`);
  console.log(`   - /api/about - Información personal`);
  console.log(`   - /api/skills - Todas las habilidades`);
  console.log(`   - /api/skills/:category - Habilidades por categoría`);
  console.log(`   - /api/projects - Todos los proyectos`);
  console.log(`   - /api/projects/:id - Proyecto específico`);
  console.log(
    `   - /api/search/projects?technology=React - Búsqueda por tecnología`
  );
  console.log(`   - /api/achievements - Logros y certificaciones`);
  console.log(`   - /api/languages - Información de idiomas`);
  console.log(`   - /api/contact - Información de contacto`);
  console.log(`   - /api/theme - Configuración del tema`);
  console.log(`📝 Nota: Las rutas sin /api redirigen automáticamente a /api/`);
});

export default app;
