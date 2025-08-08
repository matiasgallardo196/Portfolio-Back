import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { LoginDto, RegisterDto, AuthResponseDto } from "../../../dto/auth.dto";

export const ApiLogin = () =>
  applyDecorators(
    ApiOperation({
      summary: "Iniciar sesión",
      description:
        "Autentica un usuario con email y contraseña, devuelve un token JWT",
    }),
    ApiBody({ type: LoginDto }),
    ApiResponse({
      status: 200,
      description: "Login exitoso",
      type: AuthResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: "Credenciales inválidas",
      schema: {
        type: "object",
        properties: {
          statusCode: { type: "number", example: 401 },
          message: { type: "string", example: "Credenciales inválidas" },
          error: { type: "string", example: "Unauthorized" },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: "Datos de entrada inválidos",
    })
  );

export const ApiRegister = () =>
  applyDecorators(
    ApiOperation({
      summary: "Registrar usuario",
      description:
        "Crea un nuevo usuario con email y contraseña, copia datos del usuario base",
    }),
    ApiBody({ type: RegisterDto }),
    ApiResponse({
      status: 201,
      description: "Usuario registrado exitosamente",
      schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Usuario registrado exitosamente",
          },
          user: {
            type: "object",
            properties: {
              id: { type: "string", example: "uuid" },
              email: { type: "string", example: "usuario@ejemplo.com" },
              username: { type: "string", example: "usuario" },
              isActive: { type: "boolean", example: true },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: "Datos inválidos o contraseñas no coinciden",
    }),
    ApiResponse({
      status: 409,
      description: "El email ya está registrado",
    })
  );

export const ApiDashboard = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener dashboard",
      description: "Endpoint protegido que requiere token JWT válido",
    }),
    ApiResponse({
      status: 200,
      description: "Información del dashboard",
      schema: {
        type: "object",
        properties: {
          message: { type: "string", example: "Acceso al dashboard exitoso" },
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string" },
              username: { type: "string" },
              isActive: { type: "boolean" },
            },
          },
          dashboard: {
            type: "object",
            properties: {
              welcome: { type: "string" },
              timestamp: { type: "string", format: "date-time" },
              status: { type: "string" },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: "No autorizado - Token inválido o expirado",
    })
  );

export const ApiProfile = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener perfil",
      description: "Obtiene el perfil del usuario autenticado",
    }),
    ApiResponse({
      status: 200,
      description: "Perfil del usuario",
      schema: {
        type: "object",
        properties: {
          message: { type: "string", example: "Perfil obtenido exitosamente" },
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string" },
              username: { type: "string" },
              isActive: { type: "boolean" },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: "No autorizado - Token inválido o expirado",
    })
  );

export const ApiValidateToken = () =>
  applyDecorators(
    ApiOperation({
      summary: "Validar token JWT",
      description:
        "Valida un token JWT y devuelve información detallada sobre su estado y el usuario asociado",
    }),
    ApiResponse({
      status: 200,
      description: "Token válido",
      schema: {
        type: "object",
        properties: {
          valid: { type: "boolean", example: true },
          user: {
            type: "object",
            properties: {
              id: { type: "string", example: "123" },
              email: { type: "string", example: "usuario@ejemplo.com" },
              name: { type: "string", example: "Usuario Ejemplo" },
            },
          },
          expiresIn: { type: "number", example: 3600 },
          message: { type: "string", example: "Token is valid" },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: "Token inválido o expirado",
      schema: {
        type: "object",
        properties: {
          valid: { type: "boolean", example: false },
          reason: {
            type: "string",
            example: "token_expired",
            enum: [
              "token_expired",
              "token_revoked",
              "user_not_found",
              "invalid_signature",
            ],
          },
          message: { type: "string", example: "Token is invalid or expired" },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: "Token faltante",
      schema: {
        type: "object",
        properties: {
          valid: { type: "boolean", example: false },
          reason: { type: "string", example: "missing_token" },
          message: {
            type: "string",
            example: "Authorization header is required",
          },
        },
      },
    })
  );
