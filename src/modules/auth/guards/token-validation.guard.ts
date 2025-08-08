import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class TokenValidationGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Verificar que existe el header Authorization
    if (!authHeader) {
      throw new BadRequestException({
        valid: false,
        reason: "missing_token",
        message: "Authorization header is required",
      });
    }

    // Verificar formato Bearer
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new BadRequestException({
        valid: false,
        reason: "missing_token",
        message: "Invalid Authorization header format. Use 'Bearer <token>'",
      });
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      // Lanzar excepción con el formato correcto
      const reason =
        err?.name === "TokenExpiredError"
          ? "token_expired"
          : "invalid_signature";
      const message =
        err?.name === "TokenExpiredError"
          ? "Token has expired"
          : "Token is invalid or expired";

      throw new UnauthorizedException({
        valid: false,
        reason,
        message,
      });
    }
    return user;
  }
}
