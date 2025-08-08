import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PortfolioResponseDto } from "../../../dto/portfolio.dto";

// Etiqueta del módulo
export function PortfolioTag() {
  return applyDecorators(ApiTags("Portfolio"));
}

// GET /portfolio/:userId
export function GetPortfolioByUserIdDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Obtener portfolio completo por usuario",
      description:
        "Retorna toda la información del portfolio de un usuario específico incluyendo about, skills, achievements, languages, projects y contact",
    }),
    ApiParam({
      name: "userId",
      description: "ID único del usuario",
      example: "808ceb8b-8da6-440c-952d-2d5c23b070e0",
    }),
    ApiResponse({
      status: 200,
      description: "Portfolio obtenido exitosamente",
      type: PortfolioResponseDto,
    }),
    ApiResponse({ status: 404, description: "Usuario no encontrado" })
  );
}

// GET /portfolio (legacy)
export function GetFixedPortfolioDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Obtener portfolio fijo",
      description:
        "Retorna toda la información del portfolio del usuario fijo con ID 808ceb8b-8da6-440c-952d-2d5c23b070e0",
    }),
    ApiResponse({
      status: 200,
      description: "Portfolio del usuario fijo obtenido exitosamente",
    })
  );
}

// Eliminados decoradores de endpoints basados en mocks
