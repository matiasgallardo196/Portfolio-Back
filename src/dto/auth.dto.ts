import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "Email del usuario",
    example: "usuario@ejemplo.com",
  })
  @IsEmail({}, { message: "El email debe ser válido" })
  @IsNotEmpty({ message: "El email es requerido" })
  email: string;

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "password123",
    minLength: 6,
  })
  @IsString({ message: "La contraseña debe ser una cadena de texto" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  @IsNotEmpty({ message: "La contraseña es requerida" })
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    description: "Email del usuario",
    example: "usuario@ejemplo.com",
  })
  @IsEmail({}, { message: "El email debe ser válido" })
  @IsNotEmpty({ message: "El email es requerido" })
  email: string;

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "password123",
    minLength: 6,
  })
  @IsString({ message: "La contraseña debe ser una cadena de texto" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  @IsNotEmpty({ message: "La contraseña es requerida" })
  password: string;

  @ApiProperty({
    description: "Confirmación de la contraseña",
    example: "password123",
  })
  @IsString({
    message: "La confirmación de contraseña debe ser una cadena de texto",
  })
  @IsNotEmpty({ message: "La confirmación de contraseña es requerida" })
  confirmPassword: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: "Token JWT para autenticación",
  })
  token: string;

  @ApiProperty({
    description: "Información del usuario (sin contraseña)",
  })
  user: {
    id: string;
    email: string;
    username: string;
    isActive: boolean;
    createdAt: Date;
  };
}

export class TokenValidationResponseDto {
  @ApiProperty({
    description: "Indica si el token es válido",
    example: true,
  })
  valid: boolean;

  @ApiProperty({
    description: "Información del usuario (solo si el token es válido)",
    required: false,
  })
  user?: {
    id: string;
    email: string;
    name: string;
  };

  @ApiProperty({
    description: "Tiempo restante en segundos hasta que expire el token",
    example: 3600,
    required: false,
  })
  expiresIn?: number;

  @ApiProperty({
    description: "Mensaje descriptivo",
    example: "Token is valid",
  })
  message: string;
}

export class TokenValidationErrorDto {
  @ApiProperty({
    description: "Indica si el token es válido",
    example: false,
  })
  valid: boolean;

  @ApiProperty({
    description: "Razón específica del error",
    example: "token_expired",
    enum: [
      "token_expired",
      "token_revoked",
      "user_not_found",
      "invalid_signature",
      "missing_token",
      "server_error",
    ],
  })
  reason: string;

  @ApiProperty({
    description: "Mensaje descriptivo del error",
    example: "Token is invalid or expired",
  })
  message: string;
}
