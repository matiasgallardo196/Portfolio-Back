# Sistema de Autenticación - Portfolio Backend

## 📋 Descripción General

Este sistema de autenticación implementa un flujo completo de registro, login y protección de rutas usando JWT (JSON Web Tokens) en NestJS.

## 🏗️ Arquitectura

### Módulos Implementados

- **AuthModule**: Módulo principal de autenticación
- **JwtModule**: Configuración de JWT
- **PassportModule**: Estrategias de autenticación

### Componentes Principales

1. **AuthController**: Endpoints de autenticación
2. **AuthService**: Lógica de negocio
3. **JwtStrategy**: Estrategia JWT para Passport
4. **JwtAuthGuard**: Guard para proteger rutas
5. **DTOs**: Validación de datos de entrada

## 🔐 Endpoints Disponibles

### POST /auth/register

Registra un nuevo usuario.

**Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Respuesta exitosa (201):**

```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "username": "usuario",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /auth/login

Inicia sesión de un usuario.

**Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Respuesta exitosa (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "username": "usuario",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /auth/dashboard (Protegido)

Obtiene información del dashboard del usuario autenticado.

**Headers:**

```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**

```json
{
  "message": "Acceso al dashboard exitoso",
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "username": "usuario",
    "isActive": true
  },
  "dashboard": {
    "welcome": "Bienvenido usuario",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "status": "active"
  }
}
```

### GET /auth/profile (Protegido)

Obtiene el perfil del usuario autenticado.

**Headers:**

```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**

```json
{
  "message": "Perfil obtenido exitosamente",
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "username": "usuario",
    "isActive": true
  }
}
```

## 🔧 Configuración

### Variables de Entorno

Agregar al archivo `.env.development`:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1h
```

### Dependencias Instaladas

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs @types/bcryptjs @types/passport-jwt
```

## 🛡️ Seguridad

### Características de Seguridad

1. **Encriptación de Contraseñas**: Uso de bcrypt con salt rounds de 10
2. **Tokens JWT**: Con expiración configurable (por defecto 1 hora)
3. **Validación de Datos**: DTOs con validaciones completas
4. **Protección de Rutas**: Guards JWT para endpoints protegidos
5. **No Exposición de Contraseñas**: Las contraseñas nunca se devuelven en las respuestas

### Validaciones Implementadas

- Email válido y único
- Contraseña mínima de 6 caracteres
- Confirmación de contraseña
- Verificación de credenciales en login
- Validación de tokens JWT

## 📁 Estructura de Archivos

```
src/
├── modules/
│   └── auth/
│       ├── auth.module.ts
│       ├── auth.controller.ts
│       ├── auth.service.ts
│       ├── guards/
│       │   └── jwt-auth.guard.ts
│       ├── strategies/
│       │   └── jwt.strategy.ts
│       └── swagger/
│           └── auth.swagger.ts
├── dto/
│   └── auth.dto.ts
└── config/
    └── env.loader.ts
```

## 🧪 Pruebas

### Script de Pruebas Automatizadas

Ejecutar el script de pruebas:

```bash
npm run test-auth
```

Este script prueba:

1. Registro de usuario
2. Login exitoso
3. Acceso a endpoints protegidos
4. Validación de tokens
5. Manejo de errores

### Pruebas Manuales

1. **Registro**: `POST /auth/register`
2. **Login**: `POST /auth/login`
3. **Dashboard**: `GET /auth/dashboard` (con token)
4. **Perfil**: `GET /auth/profile` (con token)

## 🔄 Flujo de Registro

1. Usuario envía datos de registro
2. Sistema valida que el email no esté registrado
3. Sistema verifica que las contraseñas coincidan
4. Sistema encripta la contraseña con bcrypt
5. Sistema crea el nuevo usuario
6. Sistema copia todos los datos del usuario base (ID: 808ceb8b-8da6-440c-952d-2d5c23b070e0)
7. Sistema devuelve respuesta de éxito

## 🔄 Flujo de Login

1. Usuario envía credenciales
2. Sistema busca usuario por email
3. Sistema verifica que el usuario esté activo
4. Sistema compara contraseña encriptada
5. Sistema genera token JWT
6. Sistema devuelve token y datos del usuario (sin contraseña)

## 🚀 Uso en Frontend

### Ejemplo con Axios

```javascript
// Login
const login = async (email, password) => {
  const response = await axios.post("/auth/login", { email, password });
  const { token } = response.data;

  // Guardar token
  localStorage.setItem("token", token);

  // Configurar headers para futuras peticiones
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Acceder a ruta protegida
const getDashboard = async () => {
  const response = await axios.get("/auth/dashboard");
  return response.data;
};
```

### Ejemplo con Fetch

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  localStorage.setItem("token", data.token);
};

// Acceder a ruta protegida
const getDashboard = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("/auth/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.json();
};
```

## 📚 Documentación Swagger

La documentación completa está disponible en:

```
http://localhost:3001/api
```

## ⚠️ Consideraciones Importantes

1. **JWT_SECRET**: Cambiar en producción por una clave segura
2. **Expiración de Tokens**: Configurar según necesidades de seguridad
3. **Rate Limiting**: Considerar implementar limitación de intentos de login
4. **Refresh Tokens**: Para mayor seguridad, considerar implementar refresh tokens
5. **Logs de Seguridad**: Implementar logging de intentos de autenticación

## 🔧 Personalización

### Cambiar Expiración de Token

Modificar en `.env.development`:

```env
JWT_EXPIRES_IN=24h  # 24 horas
JWT_EXPIRES_IN=7d   # 7 días
```

### Agregar Campos Adicionales al Token

Modificar en `auth.service.ts`:

```typescript
const payload = {
  email: user.email,
  sub: user.id,
  role: user.role, // Campo adicional
  permissions: user.permissions, // Campo adicional
};
```

### Personalizar Validaciones

Modificar en `auth.dto.ts`:

```typescript
@MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
  message: 'La contraseña debe contener al menos una minúscula, una mayúscula y un número'
})
password: string;
```
