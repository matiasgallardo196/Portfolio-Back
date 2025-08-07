# 🚀 Portfolio API - Backend

API del portfolio personal desarrollada con **NestJS** y **TypeScript**.

## 📚 Documentación

Toda la documentación del proyecto está centralizada en la carpeta [`docs/`](./docs/):

📖 **Comienza aquí**: [`docs/INDEX.md`](./docs/INDEX.md) - Índice completo de documentación

### 📖 **Guías Principales**

- [`docs/README.md`](./docs/README.md) - Información básica del proyecto
- [`docs/API_README.md`](./docs/API_README.md) - Documentación completa de la API
- [`docs/ARCHITECTURE_README.md`](./docs/ARCHITECTURE_README.md) - Arquitectura y estructura del proyecto

### 🔄 **Historial de Cambios**

- [`docs/NESTJS_MIGRATION_README.md`](./docs/NESTJS_MIGRATION_README.md) - Migración de Express a NestJS
- [`docs/REFACTORING_SUMMARY.md`](./docs/REFACTORING_SUMMARY.md) - Refactorización de excepciones

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run start:dev

# Ejecutar en producción
npm run start:prod

# Construir el proyecto
npm run build
```

## 🌐 Endpoints Principales

- **Portfolio completo**: `GET /api/portfolio`
- **Información personal**: `GET /api/about`
- **Habilidades**: `GET /api/skills`
- **Proyectos**: `GET /api/projects`
- **Estado del servidor**: `GET /health`

## 🛠️ Tecnologías

- **Framework**: NestJS
- **Lenguaje**: TypeScript
- **Puerto**: 3001
- **Arquitectura**: Modular con inyección de dependencias

## 📁 Estructura del Proyecto

```
src/
├── common/exceptions/     # Excepciones personalizadas
├── portfolio/            # Módulo principal del portfolio
├── health/              # Controlador de salud
├── app.module.ts        # Módulo principal
└── main.ts             # Punto de entrada
```

---

📖 **Para más información, consulta la [documentación completa](./docs/).**
