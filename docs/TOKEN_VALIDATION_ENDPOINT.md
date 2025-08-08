# 🔐 Endpoint de Validación de Tokens

## Descripción

El endpoint `GET /auth/validate` permite validar tokens JWT y obtener información detallada sobre su estado y el usuario asociado.

## URL

```
GET http://localhost:3001/auth/validate
```

## Headers Requeridos

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

## Ejemplos de Uso

### cURL

```bash
# Token válido
curl -X GET http://localhost:3001/auth/validate \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"

# Sin token (error)
curl -X GET http://localhost:3001/auth/validate \
  -H "Content-Type: application/json"
```

### JavaScript/TypeScript

```javascript
// Validar token
async function validateToken(token) {
  try {
    const response = await fetch("http://localhost:3001/auth/validate", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Token válido:", data);
      return data;
    } else {
      console.log("Token inválido:", data);
      return data;
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
}
```

## Respuestas

### ✅ Token Válido (200 OK)

```json
{
  "valid": true,
  "user": {
    "id": "123",
    "email": "usuario@ejemplo.com",
    "name": "Usuario Ejemplo"
  },
  "expiresIn": 3600,
  "message": "Token is valid"
}
```

### ❌ Token Inválido (401 Unauthorized)

```json
{
  "valid": false,
  "reason": "token_expired",
  "message": "Token has expired"
}
```

### ❌ Token Faltante (400 Bad Request)

```json
{
  "valid": false,
  "reason": "missing_token",
  "message": "Authorization header is required"
}
```

## Códigos de Razón

| Código              | Descripción                                    |
| ------------------- | ---------------------------------------------- |
| `token_expired`     | El JWT ya expiró                               |
| `invalid_signature` | El token fue manipulado o tiene firma inválida |
| `user_not_found`    | El usuario fue eliminado o está inactivo       |
| `missing_token`     | No se envió el header Authorization            |
| `token_revoked`     | Token en blacklist (futura implementación)     |

## Validaciones Realizadas

1. ✅ Verificación de header `Authorization`
2. ✅ Extracción del token del formato `Bearer <token>`
3. ✅ Verificación del formato del JWT
4. ✅ Validación de la firma digital del token
5. ✅ Verificación de expiración
6. ✅ Verificación de que el usuario existe en la BD
7. ✅ Verificación de que el usuario está activo

## Casos de Uso

### Frontend - Validación Periódica

```javascript
// Validar token cada 5 minutos
setInterval(
  async () => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      const result = await validateToken(token);
      if (!result.valid) {
        // Redirigir al login
        window.location.href = "/login";
      }
    }
  },
  5 * 60 * 1000
);
```

### Frontend - Verificación Antes de Operaciones

```javascript
// Verificar antes de hacer una operación crítica
async function performCriticalOperation() {
  const token = localStorage.getItem("jwt_token");
  const validation = await validateToken(token);

  if (!validation.valid) {
    throw new Error("Token inválido");
  }

  // Continuar con la operación
  return await api.criticalOperation();
}
```

## Seguridad

- **Rate Limiting**: Implementado a nivel de aplicación
- **Logging**: Todas las validaciones se registran
- **Headers de Seguridad**: CORS y CSP configurados
- **Validación Completa**: Verifica token, usuario y estado

## Testing

Para probar el endpoint, ejecuta:

```bash
npm run test:token-validation
```

O usa el script manual:

```bash
npx ts-node src/scripts/test-token-validation.ts
```

## Integración con Swagger

El endpoint está documentado en Swagger UI en:

```
http://localhost:3001/api
```

## Notas Técnicas

- El endpoint reutiliza la infraestructura JWT existente
- Compatible con el sistema de autenticación actual
- No afecta el rendimiento de otros endpoints
- Respuestas consistentes con el patrón de la API
