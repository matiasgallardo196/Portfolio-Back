# Estructura de Datos Mock - Portfolio

Esta carpeta contiene todos los datos mock centralizados del portfolio, organizados de manera modular para facilitar el mantenimiento y la futura migración a una API real.

## Estructura de Archivos

```
data/
├── types.ts          # Interfaces TypeScript para tipado
├── about.ts          # Datos de la sección "Sobre mí"
├── skills.ts         # Habilidades técnicas
├── achievements.ts   # Logros y hitos importantes
├── languages.ts      # Idiomas hablados
├── projects.ts       # Proyectos del portfolio
├── contact.ts        # Información de contacto
├── index.ts          # Re-exportaciones y objeto centralizado
└── README.md         # Esta documentación
```

## Uso

### Importación Individual

```typescript
import { aboutData } from "../data/about";
import { skillsData } from "../data/skills";
import { projectsData } from "../data/projects";
```

### Importación Centralizada

```typescript
import { portfolioData } from "../data";
// Acceso a todos los datos
const { about, skills, projects, contact } = portfolioData;
```

### Importación de Tipos

```typescript
import type { Project, About, SkillCategory } from "../data";
```

## Interfaces TypeScript

### About

```typescript
interface About {
  fullName: string;
  location: string;
  biography: string;
}
```

### SkillCategory

```typescript
interface SkillCategory {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  devops: string[];
  integrations: string[];
  practices: string[];
}
```

### Project

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl: string;
}
```

### Achievement

```typescript
interface Achievement {
  id: string;
  description: string;
}
```

### Language

```typescript
interface Language {
  name: string;
  level: string;
  isNative?: boolean;
}
```

### ContactInfo

```typescript
interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  whatsapp?: string;
}
```

## Migración a API

Para migrar a una API real en el futuro:

1. **Crear servicios API**: Implementar funciones que consuman endpoints reales
2. **Mantener interfaces**: Las interfaces TypeScript pueden reutilizarse
3. **Reemplazar imports**: Cambiar las importaciones de datos mock por llamadas a servicios
4. **Manejo de estado**: Implementar loading states y error handling

### Ejemplo de Migración

```typescript
// Antes (mock)
import { portfolioData } from "../data";

// Después (API)
import { usePortfolioData } from "../services/api";
const { data: portfolioData, loading, error } = usePortfolioData();
```

## Ventajas de esta Estructura

- ✅ **Tipado fuerte**: Todas las interfaces están definidas con TypeScript
- ✅ **Modularidad**: Datos separados por sección para fácil mantenimiento
- ✅ **Reutilización**: Fácil importación y uso en cualquier componente
- ✅ **Escalabilidad**: Preparado para migración a API real
- ✅ **Consistencia**: Estructura uniforme en todo el proyecto
- ✅ **Mantenibilidad**: Cambios centralizados en un solo lugar
