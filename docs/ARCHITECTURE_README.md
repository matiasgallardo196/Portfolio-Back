# Arquitectura del Backend - Portfolio API

## 🏗️ Estructura del Proyecto

```
Portfolio-Back/
├── data/                    # Datos mock del portfolio
│   ├── about.ts
│   ├── skills.ts
│   ├── achievements.ts
│   ├── languages.ts
│   ├── projects.ts
│   ├── contact.ts
│   ├── theme.ts
│   ├── types.ts
│   └── index.ts
├── src/
│   ├── config/             # Configuraciones
│   │   └── app.ts
│   ├── controllers/        # Controladores HTTP
│   │   └── portfolioController.ts
│   ├── middleware/         # Middlewares personalizados
│   │   ├── errorHandler.ts
│   │   └── requestLogger.ts
│   ├── routes/            # Definición de rutas
│   │   ├── portfolioRoutes.ts
│   │   └── healthRoutes.ts
│   ├── services/          # Lógica de negocio
│   │   └── portfolioService.ts
│   ├── types/             # Tipos TypeScript
│   │   └── index.ts
│   └── server.ts          # Punto de entrada
├── examples/              # Ejemplos de uso
│   ├── api-usage.js
│   └── react-example.jsx
├── package.json
├── tsconfig.json
├── API_README.md
└── ARCHITECTURE_README.md
```

## 🎯 Patrón Arquitectónico

La aplicación sigue el patrón **MVC (Model-View-Controller)** con separación clara de responsabilidades:

### **📁 Services (Capa de Datos)**

- **Responsabilidad**: Lógica de negocio y acceso a datos
- **Ubicación**: `src/services/`
- **Características**:
  - Métodos async para operaciones de datos
  - Manejo de errores de negocio
  - Patrón Singleton
  - Independiente de Express

```typescript
// Ejemplo: portfolioService.ts
export class PortfolioService {
  async getAllPortfolioData(): Promise<PortfolioData> {
    return portfolioData;
  }

  async getSkillsByCategory(category: string) {
    const skills = portfolioData.skills[category];
    if (!skills) {
      throw new Error(`Categoría '${category}' no encontrada`);
    }
    return skills;
  }
}
```

### **🎮 Controllers (Capa de Control)**

- **Responsabilidad**: Manejo de peticiones HTTP y respuestas
- **Ubicación**: `src/controllers/`
- **Características**:
  - Arrow functions para evitar problemas de binding
  - Manejo centralizado de errores
  - Validación de parámetros
  - Respuestas estructuradas

```typescript
// Ejemplo: portfolioController.ts
export class PortfolioController {
  getAllPortfolioData = async (req: Request, res: Response) => {
    try {
      const data = await portfolioService.getAllPortfolioData();
      res.json(data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudieron obtener los datos",
      });
    }
  };
}
```

### **🛣️ Routes (Capa de Enrutamiento)**

- **Responsabilidad**: Definición de endpoints
- **Ubicación**: `src/routes/`
- **Características**:
  - Organización por funcionalidad
  - Separación de rutas principales y de salud
  - Mapeo directo a controladores

```typescript
// Ejemplo: portfolioRoutes.ts
const router = Router();
router.get("/portfolio", portfolioController.getAllPortfolioData);
router.get("/skills/:category", portfolioController.getSkillsByCategory);
router.get("/search/projects", portfolioController.searchProjectsByTechnology);
```

### **🔧 Middleware (Capa de Procesamiento)**

- **Responsabilidad**: Funciones intermedias entre petición y respuesta
- **Ubicación**: `src/middleware/`
- **Características**:
  - Logging de peticiones
  - Manejo centralizado de errores
  - Validación de datos
  - Autenticación (futuro)

```typescript
// Ejemplo: requestLogger.ts
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  console.log(`📥 ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `🟢 ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};
```

## 🚀 Características Implementadas

### **✅ Separación de Responsabilidades**

- **Services**: Lógica de negocio pura
- **Controllers**: Manejo HTTP
- **Routes**: Definición de endpoints
- **Middleware**: Procesamiento intermedio

### **✅ Manejo de Errores Robusto**

- Middleware centralizado de errores
- Respuestas estructuradas con información útil
- Logging detallado de errores
- Sugerencias automáticas para rutas incorrectas

### **✅ Logging Avanzado**

- Timestamps en cada petición
- Métricas de tiempo de respuesta
- Colores para códigos de estado
- Información detallada de errores

### **✅ Redirecciones Inteligentes**

- Redirección automática de `/portfolio` a `/api/portfolio`
- Sugerencias cuando se accede a rutas sin `/api`
- Endpoint raíz con información de la API

### **✅ Configuración Centralizada**

- Variables de entorno
- Configuración por entorno
- Configuración de CORS
- Configuración de logging

### **✅ Tipos TypeScript**

- Interfaces específicas para la aplicación
- Tipos para respuestas de API
- Tipos para estadísticas y búsquedas
- Extensión de tipos de Express

## 📊 Endpoints Disponibles

### **Endpoints Principales**

- `GET /api/portfolio` - Todos los datos
- `GET /api/about` - Información personal
- `GET /api/skills` - Todas las habilidades
- `GET /api/skills/:category` - Habilidades por categoría
- `GET /api/projects` - Todos los proyectos
- `GET /api/projects/:id` - Proyecto específico
- `GET /api/achievements` - Logros
- `GET /api/languages` - Idiomas
- `GET /api/contact` - Contacto
- `GET /api/theme` - Configuración del tema
- `GET /api/stats` - Estadísticas del portfolio

### **Endpoints de Utilidad**

- `GET /health` - Estado del servidor
- `GET /api/search/projects` - Búsqueda por tecnología
- `GET /` - Información de la API

### **Redirecciones Automáticas**

- `/portfolio` → `/api/portfolio`
- `/about` → `/api/about`
- `/skills` → `/api/skills`
- `/projects` → `/api/projects`
- `/achievements` → `/api/achievements`
- `/languages` → `/api/languages`
- `/contact` → `/api/contact`
- `/theme` → `/api/theme`
- `/stats` → `/api/stats`

## 🔧 Configuración

### **Variables de Entorno**

```bash
PORT=3001                    # Puerto del servidor
NODE_ENV=development         # Entorno de ejecución
CORS_ORIGIN=*               # Origen permitido para CORS
LOGGING_ENABLED=true        # Habilitar logging
LOG_LEVEL=info              # Nivel de logging
```

### **Scripts Disponibles**

```bash
npm run dev     # Desarrollo con ts-node
npm run build   # Compilación TypeScript
npm start       # Ejecutar servidor compilado
npm run watch   # Desarrollo con nodemon
```

## 🧪 Testing y Ejemplos

### **Ejemplos de Uso**

- `examples/api-usage.js` - Ejemplos generales de JavaScript
- `examples/react-example.jsx` - Implementación en React

### **Testing de Endpoints**

```bash
# Obtener todos los datos
curl http://localhost:3001/api/portfolio

# Obtener habilidades frontend
curl http://localhost:3001/api/skills/frontend

# Buscar proyectos con React
curl "http://localhost:3001/api/search/projects?technology=React"

# Obtener estadísticas
curl http://localhost:3001/api/stats

# Verificar salud del servidor
curl http://localhost:3001/health
```

## 🔮 Escalabilidad y Mantenimiento

### **Ventajas de la Arquitectura**

- **Mantenibilidad**: Código organizado y fácil de entender
- **Testabilidad**: Cada capa puede ser testeada independientemente
- **Escalabilidad**: Fácil agregar nuevos endpoints y funcionalidades
- **Reutilización**: Services pueden ser reutilizados en diferentes contextos
- **Debugging**: Logging detallado y manejo de errores claro

### **Futuras Mejoras**

- **Base de datos**: Integración con PostgreSQL/MongoDB
- **Autenticación**: JWT y middleware de autenticación
- **Validación**: Middleware de validación de datos
- **Caching**: Redis para mejorar performance
- **Testing**: Suite completa de tests unitarios e integración
- **Documentación**: Swagger/OpenAPI para documentación automática

## 📝 Convenciones de Código

### **Nomenclatura**

- **Archivos**: camelCase (portfolioController.ts)
- **Clases**: PascalCase (PortfolioController)
- **Métodos**: camelCase (getAllPortfolioData)
- **Variables**: camelCase (portfolioData)
- **Constantes**: UPPER_SNAKE_CASE (API_BASE_URL)

### **Estructura de Archivos**

- **Controllers**: `[nombre]Controller.ts`
- **Services**: `[nombre]Service.ts`
- **Routes**: `[nombre]Routes.ts`
- **Middleware**: `[nombre].ts`

### **Comentarios**

- JSDoc para métodos públicos
- Comentarios explicativos para lógica compleja
- README actualizado con cada cambio importante

Esta arquitectura proporciona una base sólida y escalable para el desarrollo de APIs con Express y TypeScript, siguiendo las mejores prácticas de la industria.
