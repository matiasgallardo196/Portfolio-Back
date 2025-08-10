# Endpoint PUT /portfolio/:userId/about

## Descripción

Este endpoint permite actualizar la información personal (about) de un usuario específico en el portfolio. El endpoint recibe un objeto completo con toda la información about y actualiza solo esa sección del portfolio, manteniendo el resto de secciones sin cambios.

## URL

```
PUT /portfolio/:userId/about
```

## Parámetros de URL

| Parámetro | Tipo   | Descripción          | Ejemplo                                |
| --------- | ------ | -------------------- | -------------------------------------- |
| `userId`  | string | ID único del usuario | `808ceb8b-8da6-440c-952d-2d5c23b070e0` |

## Headers

| Header          | Tipo   | Requerido | Descripción                 |
| --------------- | ------ | --------- | --------------------------- |
| `Content-Type`  | string | Sí        | `application/json`          |
| `Authorization` | string | No        | `Bearer {token}` (opcional) |

## Body

El endpoint recibe un objeto JSON completo con la estructura de About:

```json
{
  "fullName": "string",
  "location": "string",
  "biography": "string",
  "pageDescription": "string",
  "metaDescription": "string",
  "heroTitle": "string",
  "heroSubtitle": "string",
  "avatarUrl": "string",
  "relocationStatus": "string",
  "ctaButtons": {
    "projects": "string",
    "contact": "string"
  },
  "stats": {
    "projects": {
      "title": "string",
      "subtitle": "string"
    },
    "technologies": {
      "title": "string",
      "subtitle": "string"
    },
    "languages": {
      "title": "string",
      "subtitle": "string"
    }
  }
}
```

### Campos del Body

| Campo                         | Tipo   | Requerido | Descripción                              |
| ----------------------------- | ------ | --------- | ---------------------------------------- |
| `fullName`                    | string | Sí        | Nombre completo del usuario              |
| `location`                    | string | Sí        | Ubicación del usuario                    |
| `biography`                   | string | Sí        | Biografía del usuario                    |
| `pageDescription`             | string | Sí        | Descripción de la página                 |
| `metaDescription`             | string | Sí        | Meta descripción para SEO                |
| `heroTitle`                   | string | Sí        | Título principal                         |
| `heroSubtitle`                | string | Sí        | Subtítulo principal                      |
| `avatarUrl`                   | string | Sí        | URL del avatar                           |
| `relocationStatus`            | string | Sí        | Estado de reubicación                    |
| `ctaButtons.projects`         | string | Sí        | Texto del botón de proyectos             |
| `ctaButtons.contact`          | string | Sí        | Texto del botón de contacto              |
| `stats.projects.title`        | string | Sí        | Título de estadísticas de proyectos      |
| `stats.projects.subtitle`     | string | Sí        | Subtítulo de estadísticas de proyectos   |
| `stats.technologies.title`    | string | Sí        | Título de estadísticas de tecnologías    |
| `stats.technologies.subtitle` | string | Sí        | Subtítulo de estadísticas de tecnologías |
| `stats.languages.title`       | string | Sí        | Título de estadísticas de idiomas        |
| `stats.languages.subtitle`    | string | Sí        | Subtítulo de estadísticas de idiomas     |

## Respuestas

### Éxito (200)

Retorna el portfolio completo actualizado:

```json
{
  "about": {
    "id": "uuid",
    "fullName": "Andrés Ricardo",
    "location": "Bogotá, Colombia",
    "biography": "Desarrollador Full Stack...",
    "pageDescription": "Portfolio personal...",
    "metaDescription": "Portfolio profesional...",
    "heroTitle": "Hola, soy Andrés Ricardo",
    "heroSubtitle": "Desarrollador Full Stack",
    "avatarUrl": "https://example.com/avatar.jpg",
    "relocationStatus": "Disponible para reubicación",
    "ctaButtons": {
      "projects": "Ver Proyectos",
      "contact": "Contactar"
    },
    "stats": {
      "projects": {
        "title": "Proyectos",
        "subtitle": "Completados"
      },
      "technologies": {
        "title": "Tecnologías",
        "subtitle": "Dominadas"
      },
      "languages": {
        "title": "Idiomas",
        "subtitle": "Hablados"
      }
    },
    "userId": "808ceb8b-8da6-440c-952d-2d5c23b070e0",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  },
  "skills": {
    /* datos existentes */
  },
  "achievements": [
    /* datos existentes */
  ],
  "languages": [
    /* datos existentes */
  ],
  "projects": [
    /* datos existentes */
  ],
  "contact": {
    /* datos existentes */
  }
}
```

### Error (400) - Datos de entrada inválidos

```json
{
  "statusCode": 400,
  "message": ["fullName should not be empty", "location should not be empty"],
  "error": "Bad Request"
}
```

### Error (401) - Token inválido

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### Error (404) - Usuario no encontrado

```json
{
  "statusCode": 404,
  "message": "Usuario no encontrado",
  "error": "Not Found"
}
```

### Error (500) - Error interno del servidor

```json
{
  "statusCode": 500,
  "message": "Error interno del servidor",
  "error": "Internal Server Error"
}
```

## Ejemplo de Uso

### cURL

```bash
curl -X PUT \
  http://localhost:3001/portfolio/808ceb8b-8da6-440c-952d-2d5c23b070e0/about \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN_HERE' \
  -d '{
    "fullName": "Andrés Ricardo",
    "location": "Bogotá, Colombia",
    "biography": "Desarrollador Full Stack apasionado por crear soluciones innovadoras y escalables.",
    "pageDescription": "Portfolio personal de Andrés Ricardo - Desarrollador Full Stack",
    "metaDescription": "Portfolio profesional de Andrés Ricardo, desarrollador Full Stack",
    "heroTitle": "Hola, soy Andrés Ricardo",
    "heroSubtitle": "Desarrollador Full Stack",
    "avatarUrl": "https://example.com/avatar.jpg",
    "relocationStatus": "Disponible para reubicación",
    "ctaButtons": {
      "projects": "Ver Proyectos",
      "contact": "Contactar"
    },
    "stats": {
      "projects": {
        "title": "Proyectos",
        "subtitle": "Completados"
      },
      "technologies": {
        "title": "Tecnologías",
        "subtitle": "Dominadas"
      },
      "languages": {
        "title": "Idiomas",
        "subtitle": "Hablados"
      }
    }
  }'
```

### JavaScript/Node.js

```javascript
const axios = require("axios");

const updateAbout = async () => {
  try {
    const response = await axios.put(
      "http://localhost:3001/portfolio/808ceb8b-8da6-440c-952d-2d5c23b070e0/about",
      {
        fullName: "Andrés Ricardo",
        location: "Bogotá, Colombia",
        biography: "Desarrollador Full Stack...",
        // ... resto de campos
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_TOKEN_HERE",
        },
      }
    );

    console.log("Portfolio actualizado:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data);
  }
};
```

### React

```jsx
import axios from "axios";

const updateAbout = async (aboutData) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/portfolio/${userId}/about`,
      aboutData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
```

## Validaciones

El endpoint incluye las siguientes validaciones:

1. **Campos requeridos**: Todos los campos del objeto About son obligatorios
2. **Tipos de datos**: Validación de tipos string para todos los campos
3. **Estructura anidada**: Validación de objetos anidados (ctaButtons, stats)
4. **Existencia del usuario**: Verifica que el userId existe en la base de datos
5. **Token opcional**: Si se proporciona un token, se valida su autenticidad

## Notas Importantes

- **Objeto completo**: El frontend debe enviar el objeto about completo, no solo los campos modificados
- **Preservación de datos**: Solo se actualiza la sección about, el resto del portfolio permanece sin cambios
- **Consistencia**: La respuesta es consistente con el endpoint GET /portfolio/:userId
- **Validaciones**: Se aplican validaciones estrictas usando class-validator
- **Manejo de errores**: Errores detallados con códigos de estado HTTP apropiados

## Archivos Relacionados

- **Controlador**: `src/modules/portfolio/portfolio.controller.ts`
- **Servicio**: `src/modules/portfolio/portfolio.service.ts`
- **DTO**: `src/dto/portfolio.dto.ts`
- **Entidad**: `src/entities/about.entity.ts`
- **Documentación Swagger**: `src/modules/portfolio/swagger/portfolio.swagger.ts`
- **Script de prueba**: `src/scripts/test-update-about.ts`
- **Ejemplos**: `examples/update-about-example.js`, `examples/react-update-about-example.jsx`
