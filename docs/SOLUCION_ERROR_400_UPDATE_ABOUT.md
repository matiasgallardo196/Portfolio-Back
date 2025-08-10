# Solución al Error 400 en PUT /portfolio/:userId/about

## Problema Identificado

El error `400 Bad Request` que estabas experimentando se debía a que el cuerpo de la petición incluía campos que **no están permitidos** en el `UpdateAboutDto`.

### Campos Prohibidos

Los siguientes campos **NO** deben estar presentes en el body de la petición PUT:

- `id` - ID del registro (gestionado por la base de datos)
- `createdAt` - Fecha de creación (gestionado por la base de datos)
- `updatedAt` - Fecha de actualización (gestionado por la base de datos)
- `userId` - ID del usuario (se pasa como parámetro de ruta)

## Causa del Error

La `ValidationPipe` global de NestJS está configurada con:

- `whitelist: true` - Solo permite campos definidos en el DTO
- `forbidNonWhitelisted: true` - Rechaza peticiones con campos no permitidos

Cuando envías campos no definidos en `UpdateAboutDto`, la validación falla y devuelve un error 400.

## Solución

### Body Correcto para la Petición PUT

```json
{
  "fullName": "Matias Gallardo12",
  "location": "Sydney, Australia",
  "biography": "I'm a Full Stack Web Developer with a strong Back-End orientation...",
  "pageDescription": "Learn more about Matias Gallardo's experience and skills in full stack development",
  "metaDescription": "Full Stack Web Developer with strong Back-End orientation. Specialized in NestJS, TypeScript, PostgreSQL, and scalable systems. Based in Sydney, Australia.",
  "heroTitle": "Full Stack Web Developer",
  "heroSubtitle": "Back-End Oriented",
  "avatarUrl": "/avatar.jpg",
  "relocationStatus": "Open to relocate",
  "ctaButtons": {
    "projects": "Checkout My Work",
    "contact": "Contact Me"
  },
  "stats": {
    "projects": {
      "title": "Projects",
      "subtitle": "Completed"
    },
    "technologies": {
      "title": "Technologies",
      "subtitle": "Mastered"
    },
    "languages": {
      "title": "Languages",
      "subtitle": "Spoken"
    }
  }
}
```

### Campos Permitidos en UpdateAboutDto

Solo estos campos están permitidos en el body de la petición:

1. `fullName` - Nombre completo del usuario
2. `location` - Ubicación del usuario
3. `biography` - Biografía del usuario
4. `pageDescription` - Descripción de la página
5. `metaDescription` - Meta descripción para SEO
6. `heroTitle` - Título principal
7. `heroSubtitle` - Subtítulo principal
8. `avatarUrl` - URL del avatar
9. `relocationStatus` - Estado de reubicación
10. `ctaButtons` - Botones de llamada a la acción
    - `projects` - Texto del botón de proyectos
    - `contact` - Texto del botón de contacto
11. `stats` - Estadísticas del portfolio
    - `projects` - Estadísticas de proyectos
    - `technologies` - Estadísticas de tecnologías
    - `languages` - Estadísticas de idiomas

## Ejemplo de Uso Correcto

### cURL

```bash
curl -X PUT "http://localhost:3001/portfolio/fa8adc3f-ce82-42a8-a57a-9ca2c4805ee4/about" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Matias Gallardo12",
    "location": "Sydney, Australia",
    "biography": "I am a Full Stack Developer...",
    "pageDescription": "Learn more about Matias Gallardo...",
    "metaDescription": "Full Stack Web Developer...",
    "heroTitle": "Full Stack Web Developer",
    "heroSubtitle": "Back-End Oriented",
    "avatarUrl": "/avatar.jpg",
    "relocationStatus": "Open to relocate",
    "ctaButtons": {
      "projects": "Checkout My Work",
      "contact": "Contact Me"
    },
    "stats": {
      "projects": {
        "title": "Projects",
        "subtitle": "Completed"
      },
      "technologies": {
        "title": "Technologies",
        "subtitle": "Mastered"
      },
      "languages": {
        "title": "Languages",
        "subtitle": "Spoken"
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
      "http://localhost:3001/portfolio/fa8adc3f-ce82-42a8-a57a-9ca2c4805ee4/about",
      {
        fullName: "Matias Gallardo12",
        location: "Sydney, Australia",
        biography: "I am a Full Stack Developer...",
        // ... resto de campos permitidos
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Actualización exitosa:", response.data);
  } catch (error) {
    console.error("❌ Error:", error.response?.data);
  }
};
```

## Verificación

El endpoint funciona correctamente cuando se envía el body apropiado. Puedes verificar esto ejecutando:

```bash
npm run test-correct-body
```

## Resumen

- **Problema**: Campos no permitidos en el body de la petición
- **Solución**: Enviar solo los campos definidos en `UpdateAboutDto`
- **Resultado**: Endpoint funciona correctamente y devuelve el portfolio completo actualizado

El endpoint está funcionando perfectamente. Solo necesitas ajustar el body de la petición para incluir únicamente los campos permitidos.
