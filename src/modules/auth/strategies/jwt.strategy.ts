import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "../../../config/env.loader";
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private databaseService: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.databaseService.getUserById(payload.sub);

    if (!user || !user.isActive) {
      throw new UnauthorizedException("Usuario no encontrado o inactivo");
    }

    // No devolver la contraseña
    const { password, ...result } = user;
    return result;
  }
}
