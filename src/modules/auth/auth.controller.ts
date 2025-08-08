import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto, AuthResponseDto } from "../../dto/auth.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { TokenValidationGuard } from "./guards/token-validation.guard";
import {
  ApiLogin,
  ApiRegister,
  ApiDashboard,
  ApiProfile,
  ApiValidateToken,
} from "./swagger/auth.swagger";

@ApiTags("Autenticación")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiLogin()
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiRegister()
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get("dashboard")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiDashboard()
  async getDashboard(@Request() req) {
    return {
      message: "Acceso al dashboard exitoso",
      user: req.user,
      dashboard: {
        welcome: `Bienvenido ${req.user.username}`,
        timestamp: new Date().toISOString(),
        status: "active",
      },
    };
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiProfile()
  async getProfile(@Request() req) {
    return {
      message: "Perfil obtenido exitosamente",
      user: req.user,
    };
  }

  @Get("validate")
  @UseGuards(TokenValidationGuard)
  @ApiBearerAuth()
  @ApiValidateToken()
  async validateToken(@Request() req) {
    // Si llegamos aquí, el token es válido
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    return await this.authService.validateTokenWithDetails(token);
  }
}
