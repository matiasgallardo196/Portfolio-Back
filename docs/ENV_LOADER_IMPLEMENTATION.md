# Implementación del Sistema de Variables de Entorno

## Descripción

Se ha implementado un sistema centralizado para manejar las variables de entorno del proyecto Portfolio-Back usando un archivo `env.loader.ts` que carga automáticamente las variables desde `.env.development` en modo desarrollo.

## Estructura del Sistema

### Archivo Principal: `src/config/env.loader.ts`

Este archivo centraliza todas las variables de entorno del proyecto:

```typescript
import { config as dotenvConfig } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenvConfig({ path: ".env.development" });
}

// Exporta todas las variables de entorno tipadas
export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
// ... más variables
```

### Variables Disponibles

#### 🔧 **Configuración de Base de Datos**

- `DB_HOST` - Host de PostgreSQL
- `DB_PORT` - Puerto de PostgreSQL (default: 5432)
- `DB_USERNAME` - Usuario de PostgreSQL
- `DB_PASSWORD` - Contraseña de PostgreSQL
- `DB_NAME` - Nombre de la base de datos

#### 🌍 **Configuración del Entorno**

- `NODE_ENV` - Entorno de ejecución (development/production)
- `PORT` - Puerto del servidor (default: 3001)
- `CORS_ORIGIN` - Origen permitido para CORS

#### 🌐 **Frontend**

- `FRONTEND_URL` - URL del frontend

## Configuración

### 1. Crear el archivo `.env.development`

Copia el archivo `env.example` y renómbralo a `.env.development`:

```bash
cp env.example .env.development
```

### 2. Configurar las variables

Edita el archivo `.env.development` con tus valores:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password_real
DB_NAME=portfolio_db

# Environment
NODE_ENV=development
PORT=3001
CORS_ORIGIN=*

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Variables adicionales

Si necesitas agregar más variables en el futuro, puedes:

1. Agregarlas al archivo `src/config/env.loader.ts`
2. Documentarlas en esta sección
3. Actualizar el archivo `env.example`

## Uso en el Código

### Importar variables en cualquier archivo:

```typescript
import { DB_HOST, DB_PORT, PORT, NODE_ENV } from "../config/env.loader";

// Usar las variables
console.log(`Conectando a ${DB_HOST}:${DB_PORT}`);
console.log(`Servidor en puerto ${PORT}`);
```

### En la configuración de TypeORM:

```typescript
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} from "./env.loader";

export const databaseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: DB_HOST || "localhost",
  port: DB_PORT,
  username: DB_USERNAME || "postgres",
  password: DB_PASSWORD || "password",
  database: DB_NAME || "portfolio_db",
  // ...
};
```

## Ventajas del Sistema

### ✅ **Centralización**

- Todas las variables en un solo lugar
- Fácil mantenimiento y gestión

### ✅ **Tipado**

- Variables tipadas con TypeScript
- Mejor autocompletado en el IDE

### ✅ **Validación**

- Valores por defecto configurados
- Logs automáticos de configuración

### ✅ **Flexibilidad**

- Carga automática según el entorno
- Variables opcionales bien organizadas

### ✅ **Seguridad**

- Separación clara entre desarrollo y producción
- Variables sensibles comentadas por defecto

## Logs Automáticos

El sistema incluye logs automáticos que muestran:

```
🔧 Variables de entorno cargadas desde .env.development
   NODE_ENV: development
   PORT: 3001
   DB_HOST: localhost (default)
   DB_PORT: 5432
   DB_NAME: portfolio_db (default)
   DB_USERNAME: postgres (default)
   DB_PASSWORD: ***configurado***
```

## Próximos Pasos

1. **Configurar PostgreSQL** con las credenciales correctas
2. **Crear la base de datos** `portfolio_db`
3. **Ejecutar el script de seed** para poblar la base de datos
4. **Implementar funcionalidades adicionales** usando las variables opcionales

## Troubleshooting

### Error: "Variables usando valores por defecto"

- Verifica que el archivo `.env.development` existe
- Confirma que las variables están escritas correctamente
- Asegúrate de que no hay espacios extra

### Error: "Conexión a base de datos fallida"

- Verifica las credenciales de PostgreSQL
- Confirma que PostgreSQL está ejecutándose
- Revisa que la base de datos existe
