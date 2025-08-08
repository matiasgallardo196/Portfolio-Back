# Implementación de TypeORM

## Descripción

Se ha implementado TypeORM en el proyecto Portfolio-Back para manejar la persistencia de datos en una base de datos PostgreSQL. Las entidades están basadas en la estructura de datos existente en el directorio `data/`.

## Entidades Implementadas

### 1. About

- **Tabla**: `about`
- **Campos**: Información personal, biografía, configuración de la página
- **Relaciones**: Ninguna

### 2. Skill

- **Tabla**: `skills`
- **Campos**: Nombre, categoría (enum)
- **Categorías**: languages, frontend, backend, databases, devops, integrations, practices
- **Relaciones**: Many-to-Many con Project, Contact

### 3. Achievement

- **Tabla**: `achievements`
- **Campos**: Descripción
- **Relaciones**: Ninguna

### 4. Language

- **Tabla**: `languages`
- **Campos**: Nombre, nivel, es nativo
- **Relaciones**: Ninguna

### 5. Project

- **Tabla**: `projects`
- **Campos**: Título, descripción, URLs, imagen
- **Relaciones**: Many-to-Many con Skill (technologies)

### 6. Contact

- **Tabla**: `contact`
- **Campos**: Información de contacto, configuración de página
- **Relaciones**: Many-to-Many con Skill (opportunities, locationInfo)

## Configuración

### Variables de Entorno

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=portfolio_db
NODE_ENV=development
```

### Configuración de TypeORM

- **Archivo**: `src/config/database.config.ts`
- **Sincronización**: Habilitada solo en desarrollo
- **Logging**: Habilitado en desarrollo
- **SSL**: Configurado para producción

## Estructura de Archivos

```
src/
├── entities/
│   ├── about.entity.ts
│   ├── skill.entity.ts
│   ├── achievement.entity.ts
│   ├── language.entity.ts
│   ├── project.entity.ts
│   ├── contact.entity.ts
│   └── index.ts
├── modules/
│   └── database/
│       ├── database.module.ts
│       └── database.service.ts
├── config/
│   └── database.config.ts
└── scripts/
    └── seed-database.ts
```

## Servicios

### DatabaseService

Proporciona métodos CRUD para todas las entidades:

- **About**: getAbout(), createAbout(), updateAbout()
- **Skill**: getAllSkills(), getSkillsByCategory(), createSkill(), updateSkill(), deleteSkill()
- **Achievement**: getAllAchievements(), createAchievement(), updateAchievement(), deleteAchievement()
- **Language**: getAllLanguages(), createLanguage(), updateLanguage(), deleteLanguage()
- **Project**: getAllProjects(), getProjectById(), createProject(), updateProject(), deleteProject()
- **Contact**: getContact(), createContact(), updateContact()

## Migración de Datos

### Script de Seed

```bash
npm run seed
```

El script `seed-database.ts` migra automáticamente todos los datos del directorio `data/` a la base de datos:

1. Crea el registro About
2. Crea todas las Skills organizadas por categoría
3. Crea todos los Achievements
4. Crea todos los Languages
5. Crea todos los Projects con sus relaciones de technologies
6. Crea el registro Contact con sus relaciones

## Uso

### Importar el Módulo

```typescript
import { DatabaseModule } from "./modules/database/database.module";

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
```

### Inyectar el Servicio

```typescript
import { DatabaseService } from "./modules/database/database.service";

@Injectable()
export class MyService {
  constructor(private databaseService: DatabaseService) {}

  async getProjects() {
    return this.databaseService.getAllProjects();
  }
}
```

## Características

- ✅ Entidades basadas en TypeScript con decoradores
- ✅ Relaciones Many-to-Many configuradas
- ✅ Timestamps automáticos (createdAt, updatedAt)
- ✅ UUIDs como claves primarias
- ✅ Enums para categorías de skills
- ✅ Migración automática de datos existentes
- ✅ Configuración flexible para desarrollo/producción
- ✅ Logging en desarrollo
- ✅ Manejo de SSL para producción

## Próximos Pasos

1. Configurar migraciones para producción
2. Implementar validaciones con class-validator
3. Agregar índices para optimización
4. Implementar soft deletes
5. Agregar auditoría de cambios
