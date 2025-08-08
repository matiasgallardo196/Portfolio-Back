import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { DatabaseService } from "../database/database.service";
import { LoginDto, RegisterDto, AuthResponseDto } from "../../dto/auth.dto";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config/env.loader";

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Buscar usuario por email
    const user = await this.databaseService.getUserByEmail(email);

    if (!user || !user.isActive) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    // Generar token JWT
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload, {
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN,
    });

    // No devolver la contraseña
    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  }

  async register(
    registerDto: RegisterDto
  ): Promise<{ message: string; user: any }> {
    const { email, password, confirmPassword } = registerDto;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      throw new BadRequestException("Las contraseñas no coinciden");
    }

    // Verificar que el email no esté registrado
    const existingUser = await this.databaseService.getUserByEmail(email);

    if (existingUser) {
      throw new ConflictException("El email ya está registrado");
    }

    // Obtener el usuario base para copiar datos
    const baseUser = await this.databaseService.getUserById(
      "808ceb8b-8da6-440c-952d-2d5c23b070e0"
    );

    if (!baseUser) {
      throw new BadRequestException("Usuario base no encontrado");
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear nuevo usuario copiando datos del usuario base
    const savedUser = await this.databaseService.createUser({
      email,
      password: hashedPassword,
      username: baseUser.username,
      isActive: true,
    });

    // Copiar todas las entidades relacionadas del usuario base al nuevo usuario
    await this.copyUserData(baseUser.id, savedUser.id);

    // No devolver la contraseña
    const { password: _, ...userWithoutPassword } = savedUser;

    return {
      message: "Usuario registrado exitosamente",
      user: userWithoutPassword,
    };
  }

  private async copyUserData(
    fromUserId: string,
    toUserId: string
  ): Promise<void> {
    // Copiar About
    const about = await this.databaseService.getAboutByUserId(fromUserId);
    if (about) {
      await this.databaseService.createAbout({
        ...about,
        id: undefined,
        userId: toUserId,
      });
    }

    // Copiar Skills
    const skills = await this.databaseService.getSkillsByUserId(fromUserId);
    for (const skill of skills) {
      await this.databaseService.createSkill({
        ...skill,
        id: undefined,
        userId: toUserId,
      });
    }

    // Copiar Achievements
    const achievements =
      await this.databaseService.getAchievementsByUserId(fromUserId);
    for (const achievement of achievements) {
      await this.databaseService.createAchievement({
        ...achievement,
        id: undefined,
        userId: toUserId,
      });
    }

    // Copiar Languages
    const languages =
      await this.databaseService.getLanguagesByUserId(fromUserId);
    for (const language of languages) {
      await this.databaseService.createLanguage({
        ...language,
        id: undefined,
        userId: toUserId,
      });
    }

    // Copiar Projects
    const projects = await this.databaseService.getProjectsByUserId(fromUserId);
    for (const project of projects) {
      await this.databaseService.createProject({
        ...project,
        id: undefined,
        userId: toUserId,
      });
    }

    // Copiar Contact
    const contact = await this.databaseService.getContactByUserId(fromUserId);
    if (contact) {
      await this.databaseService.createContact({
        ...contact,
        id: undefined,
        userId: toUserId,
      });
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token, { secret: JWT_SECRET });
      return payload;
    } catch (error) {
      throw new UnauthorizedException("Token inválido");
    }
  }

  async validateTokenWithDetails(token: string): Promise<{
    valid: boolean;
    user?: any;
    expiresIn?: number;
    message: string;
    reason?: string;
  }> {
    try {
      // Verificar el token JWT
      const payload = this.jwtService.verify(token, { secret: JWT_SECRET });

      // Verificar que el usuario existe y está activo
      const user = await this.databaseService.getUserById(payload.sub);

      if (!user) {
        return {
          valid: false,
          reason: "user_not_found",
          message: "Usuario no encontrado",
        };
      }

      if (!user.isActive) {
        return {
          valid: false,
          reason: "user_not_found",
          message: "Usuario inactivo",
        };
      }

      // Calcular tiempo restante hasta expiración
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresIn = payload.exp - currentTime;

      // No devolver la contraseña
      const { password, ...userWithoutPassword } = user;

      return {
        valid: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.username,
        },
        expiresIn: expiresIn > 0 ? expiresIn : 0,
        message: "Token is valid",
      };
    } catch (error) {
      let reason = "invalid_signature";
      let message = "Token is invalid or expired";

      if (error.name === "TokenExpiredError") {
        reason = "token_expired";
        message = "Token has expired";
      } else if (error.name === "JsonWebTokenError") {
        reason = "invalid_signature";
        message = "Invalid token signature";
      }

      return {
        valid: false,
        reason,
        message,
      };
    }
  }
}
