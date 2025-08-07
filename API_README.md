# API del Portfolio

Una API simple construida con Express y TypeScript que sirve los datos del portfolio desde archivos mock con estructura mejorada y arquitectura limpia.

## Arquitectura

La API está estructurada siguiendo el patrón **MVC (Model-View-Controller)** con separación de responsabilidades:

```
src/
├── config/           # Configuraciones de la aplicación
├── controllers/      # Controladores que manejan las peticiones HTTP
├── middleware/       # Middlewares personalizados
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio y acceso a datos
├── types/           # Tipos TypeScript específicos de la app
└── server.ts        # Punto de entrada de la aplicación
```

### Componentes principales:

- **Routes**: Definen los endpoints de la API
- **Controllers**: Manejan las peticiones HTTP y respuestas
- **Services**: Contienen la lógica de negocio y acceso a datos
- **Middleware**: Funciones que se ejecutan entre petición y respuesta

## Instalación

```bash
npm install
```

## Scripts disponibles

- `npm run dev` - Ejecuta el servidor en modo desarrollo con ts-node
- `npm run build` - Compila el proyecto TypeScript
- `npm start` - Ejecuta el servidor compilado
- `npm run watch` - Ejecuta el servidor con nodemon para desarrollo

## Endpoints

### GET /api/portfolio

Devuelve todos los datos del portfolio en formato JSON.

**Respuesta:**

```json
{
  "about": { ... },
  "skills": { ... },
  "achievements": [ ... ],
  "languages": [ ... ],
  "projects": [ ... ],
  "contact": { ... },
  "theme": { ... }
}
```

### GET /api/about

Devuelve solo la información personal del portfolio.

**Respuesta:**

```json
{
  "fullName": "Matias Gallardo",
  "location": "Sydney, Australia",
  "pageDescription": "...",
  "metaDescription": "...",
  "heroTitle": "Full Stack Web Developer",
  "heroSubtitle": "Back-End Oriented",
  "avatarUrl": "/avatar.jpg",
  "relocationStatus": "Open to relocate",
  "ctaButtons": { ... },
  "stats": { ... },
  "biography": "..."
}
```

### GET /api/skills

Devuelve todas las habilidades organizadas por categorías.

**Respuesta:**

```json
{
  "languages": [{ "id": "lang-1", "name": "JavaScript" }, ...],
  "frontend": [{ "id": "frontend-1", "name": "React" }, ...],
  "backend": [{ "id": "backend-1", "name": "NestJS" }, ...],
  "databases": [{ "id": "db-1", "name": "PostgreSQL" }, ...],
  "devops": [{ "id": "devops-1", "name": "Docker" }, ...],
  "integrations": [{ "id": "integration-1", "name": "Auth0" }, ...],
  "practices": [{ "id": "practice-1", "name": "Testing" }, ...]
}
```

### GET /api/skills/:category

Devuelve habilidades de una categoría específica.

**Parámetros:**

- `category`: Una de las categorías disponibles (languages, frontend, backend, databases, devops, integrations, practices)

**Ejemplo:** `GET /api/skills/frontend`

**Respuesta:**

```json
[
  { "id": "frontend-1", "name": "React" },
  { "id": "frontend-2", "name": "Recharts" },
  ...
]
```

### GET /api/projects

Devuelve todos los proyectos del portfolio.

**Respuesta:**

```json
[
  {
    "id": "project-1",
    "title": "SmartQR – QR Order Platform for Restaurants",
    "description": "...",
    "technologies": [{ "id": "tech-nestjs-1", "name": "NestJS" }, ...],
    "githubUrl": "...",
    "demoUrl": "...",
    "imageUrl": "/project1.jpg"
  },
  ...
]
```

### GET /api/projects/:id

Devuelve un proyecto específico por su ID.

**Parámetros:**

- `id`: ID único del proyecto

**Ejemplo:** `GET /api/projects/project-1`

**Respuesta:**

```json
{
  "id": "project-1",
  "title": "SmartQR – QR Order Platform for Restaurants",
  "description": "...",
  "technologies": [...],
  "githubUrl": "...",
  "demoUrl": "...",
  "imageUrl": "/project1.jpg"
}
```

### GET /api/achievements

Devuelve todos los logros y certificaciones.

**Respuesta:**

```json
[
  {
    "id": "achievement-1",
    "description": "5 full-stack projects deployed to production with CI/CD"
  },
  ...
]
```

### GET /api/languages

Devuelve información sobre idiomas.

**Respuesta:**

```json
[
  {
    "id": "lang-sp-1",
    "name": "Spanish",
    "level": "Mother Tongue",
    "isNative": true
  },
  {
    "id": "lang-en-1",
    "name": "English",
    "level": "C1 Level"
  }
]
```

### GET /api/contact

Devuelve información de contacto y detalles adicionales.

**Respuesta:**

```json
{
  "email": "matiasgallardo196@gmail.com",
  "linkedin": "https://linkedin.com/in/matiasgallardo-dev",
  "github": "https://github.com/matiasgallardo196",
  "metaDescription": "...",
  "pageTitle": "Let's Connect",
  "heroTitle": "Let's Connect",
  "letsTalkTitle": "Let's Talk!",
  "letsTalkDescription": "...",
  "availabilityTitle": "Availability",
  "currentStatusTitle": "Current Status",
  "opportunities": [...],
  "locationTitle": "Location & Relocation",
  "locationInfo": [...]
}
```

### GET /api/theme

Devuelve la configuración del tema del portfolio.

**Respuesta:**

```json
{
  "colors": { ... },
  "fonts": { ... },
  "animations": { ... },
  "spacing": { ... },
  "shadows": { ... },
  "gradients": { ... },
  "breakpoints": { ... },
  "borderRadius": { ... },
  "backdropBlur": { ... },
  "transitions": { ... },
  "zIndex": { ... }
}
```

### GET /api/search/projects

Busca proyectos por tecnología específica.

**Parámetros de query:**

- `technology`: Tecnología a buscar (ej: "React", "NestJS", "PostgreSQL")

**Ejemplo:** `GET /api/search/projects?technology=React`

**Respuesta:**

```json
{
  "searchTerm": "React",
  "results": [
    {
      "id": "project-1",
      "title": "SmartQR – QR Order Platform for Restaurants",
      "description": "...",
      "technologies": [...],
      "githubUrl": "...",
      "demoUrl": "...",
      "imageUrl": "/project1.jpg"
    }
  ],
  "totalResults": 1
}
```

### GET /api/stats

Devuelve estadísticas del portfolio.

**Respuesta:**

```json
{
  "totalProjects": 5,
  "totalSkills": 25,
  "totalAchievements": 6,
  "totalLanguages": 2,
  "skillCategories": 7
}
```

### GET /health

Endpoint de salud para verificar que el servidor está funcionando.

**Respuesta:**

```json
{
  "status": "OK",
  "message": "Servidor funcionando correctamente",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "endpoints": {
    "portfolio": "/api/portfolio",
    "about": "/api/about",
    "skills": "/api/skills",
    "projects": "/api/projects",
    "achievements": "/api/achievements",
    "languages": "/api/languages",
    "contact": "/api/contact",
    "theme": "/api/theme",
    "search": "/api/search/projects",
    "stats": "/api/stats"
  },
  "stats": {
    "totalProjects": 5,
    "totalSkills": 25,
    "totalAchievements": 6,
    "totalLanguages": 2,
    "skillCategories": 7
  }
}
```

## Uso

1. Instala las dependencias: `npm install`
2. Ejecuta en desarrollo: `npm run dev`
3. El servidor estará disponible en `http://localhost:3001`
4. Accede a los datos del portfolio en `http://localhost:3001/api/portfolio`

## Estructura de datos mejorada

Los datos están organizados en módulos TypeScript dentro de la carpeta `/data` con estructura mejorada:

- `about.ts` - Información personal con metadatos SEO
- `skills.ts` - Habilidades técnicas con IDs únicos
- `achievements.ts` - Logros y certificaciones
- `languages.ts` - Idiomas con niveles
- `projects.ts` - Proyectos con tecnologías estructuradas
- `contact.ts` - Información de contacto con detalles adicionales
- `theme.ts` - Configuración completa del tema
- `index.ts` - Exportación centralizada de todos los datos

## Características de la arquitectura

- ✅ **Separación de responsabilidades** (Routes, Controllers, Services)
- ✅ **Manejo centralizado de errores** con middleware personalizado
- ✅ **Logging de peticiones** con información detallada
- ✅ **Configuración centralizada** con variables de entorno
- ✅ **Tipos TypeScript** específicos para la aplicación
- ✅ **Patrón Singleton** para servicios y controladores
- ✅ **Middleware de CORS** configurado
- ✅ **Validación de parámetros** en endpoints dinámicos
- ✅ **Respuestas estructuradas** con información de errores

## Nuevas características

- ✅ **Endpoints específicos** para cada sección del portfolio
- ✅ **Búsqueda de proyectos** por tecnología
- ✅ **Estadísticas del portfolio** con endpoint dedicado
- ✅ **IDs únicos** para todos los elementos
- ✅ **Estructura SkillItem** con id y name
- ✅ **Metadatos SEO** en about y contact
- ✅ **Información detallada** en cada sección
- ✅ **Manejo de errores mejorado** con mensajes descriptivos
- ✅ **Documentación de endpoints** en el endpoint de salud
- ✅ **Validación de parámetros** en endpoints dinámicos

## Ejemplos de uso

```bash
# Obtener todos los datos
curl http://localhost:3001/api/portfolio

# Obtener solo habilidades frontend
curl http://localhost:3001/api/skills/frontend

# Obtener un proyecto específico
curl http://localhost:3001/api/projects/project-1

# Buscar proyectos que usen React
curl "http://localhost:3001/api/search/projects?technology=React"

# Obtener estadísticas del portfolio
curl http://localhost:3001/api/stats

# Verificar estado del servidor
curl http://localhost:3001/health
```

## Variables de entorno

```bash
PORT=3001                    # Puerto del servidor
NODE_ENV=development         # Entorno de ejecución
CORS_ORIGIN=*               # Origen permitido para CORS
LOGGING_ENABLED=true        # Habilitar logging
LOG_LEVEL=info              # Nivel de logging
```
