import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class AboutDto {
  @ApiProperty({ description: "ID único del registro about" })
  id: string;

  @ApiProperty({ description: "Nombre completo del usuario" })
  fullName: string;

  @ApiProperty({ description: "Ubicación del usuario" })
  location: string;

  @ApiProperty({ description: "Biografía del usuario" })
  biography: string;

  @ApiProperty({ description: "Descripción de la página" })
  pageDescription: string;

  @ApiProperty({ description: "Meta descripción para SEO" })
  metaDescription: string;

  @ApiProperty({ description: "Título principal" })
  heroTitle: string;

  @ApiProperty({ description: "Subtítulo principal" })
  heroSubtitle: string;

  @ApiProperty({ description: "URL del avatar" })
  avatarUrl: string;

  @ApiProperty({ description: "Estado de reubicación" })
  relocationStatus: string;

  @ApiProperty({ description: "Botones de llamada a la acción" })
  ctaButtons: {
    projects: string;
    contact: string;
  };

  @ApiProperty({ description: "Estadísticas del portfolio" })
  stats: {
    projects: { title: string; subtitle: string };
    technologies: { title: string; subtitle: string };
    languages: { title: string; subtitle: string };
  };

  @ApiProperty({ description: "ID del usuario propietario" })
  userId: string;

  @ApiProperty({ description: "Fecha de creación" })
  createdAt: Date;

  @ApiProperty({ description: "Fecha de última actualización" })
  updatedAt: Date;
}

export class SkillDto {
  @ApiProperty({ description: "ID único de la skill" })
  id: string;

  @ApiProperty({ description: "Nombre de la skill" })
  name: string;

  @ApiProperty({
    description: "Categoría de la skill",
    enum: [
      "languages",
      "frontend",
      "backend",
      "databases",
      "devops",
      "integrations",
      "practices",
    ],
  })
  category: string;

  @ApiProperty({ description: "ID del usuario propietario" })
  userId: string;

  @ApiProperty({ description: "Fecha de creación" })
  createdAt: Date;

  @ApiProperty({ description: "Fecha de última actualización" })
  updatedAt: Date;
}

export class SkillsByCategoryDto {
  @ApiProperty({ type: [SkillDto], description: "Skills de idiomas" })
  languages: SkillDto[];

  @ApiProperty({ type: [SkillDto], description: "Skills de frontend" })
  frontend: SkillDto[];

  @ApiProperty({ type: [SkillDto], description: "Skills de backend" })
  backend: SkillDto[];

  @ApiProperty({ type: [SkillDto], description: "Skills de bases de datos" })
  databases: SkillDto[];

  @ApiProperty({ type: [SkillDto], description: "Skills de devops" })
  devops: SkillDto[];

  @ApiProperty({ type: [SkillDto], description: "Skills de integraciones" })
  integrations: SkillDto[];

  @ApiProperty({ type: [SkillDto], description: "Skills de prácticas" })
  practices: SkillDto[];
}

export class AchievementDto {
  @ApiProperty({ description: "ID único del logro" })
  id: string;

  @ApiProperty({ description: "Descripción del logro" })
  description: string;

  @ApiProperty({ description: "ID del usuario propietario" })
  userId: string;

  @ApiProperty({ description: "Fecha de creación" })
  createdAt: Date;

  @ApiProperty({ description: "Fecha de última actualización" })
  updatedAt: Date;
}

export class LanguageDto {
  @ApiProperty({ description: "ID único del idioma" })
  id: string;

  @ApiProperty({ description: "Nombre del idioma" })
  name: string;

  @ApiProperty({ description: "Nivel de dominio" })
  level: string;

  @ApiProperty({ description: "Si es idioma nativo" })
  isNative: boolean;

  @ApiProperty({ description: "ID del usuario propietario" })
  userId: string;

  @ApiProperty({ description: "Fecha de creación" })
  createdAt: Date;

  @ApiProperty({ description: "Fecha de última actualización" })
  updatedAt: Date;
}

export class ProjectDto {
  @ApiProperty({ description: "ID único del proyecto" })
  id: string;

  @ApiProperty({ description: "Título del proyecto" })
  title: string;

  @ApiProperty({ description: "Descripción del proyecto" })
  description: string;

  @ApiProperty({ description: "URL del repositorio GitHub" })
  githubUrl: string;

  @ApiProperty({ description: "URL de demostración", required: false })
  demoUrl?: string;

  @ApiProperty({ description: "URL de la imagen del proyecto" })
  imageUrl: string;

  @ApiProperty({ description: "ID del usuario propietario" })
  userId: string;

  @ApiProperty({ type: [SkillDto], description: "Tecnologías utilizadas" })
  technologies: SkillDto[];

  @ApiProperty({ description: "Fecha de creación" })
  createdAt: Date;

  @ApiProperty({ description: "Fecha de última actualización" })
  updatedAt: Date;
}

export class ContactDto {
  @ApiProperty({ description: "ID único del contacto" })
  id: string;

  @ApiProperty({ description: "Email de contacto" })
  email: string;

  @ApiProperty({ description: "URL de LinkedIn" })
  linkedin: string;

  @ApiProperty({ description: "URL de GitHub" })
  github: string;

  @ApiProperty({ description: "Número de WhatsApp", required: false })
  whatsapp?: string;

  @ApiProperty({ description: "Meta descripción para SEO" })
  metaDescription: string;

  @ApiProperty({ description: "Título de la página" })
  pageTitle: string;

  @ApiProperty({ description: "Título principal" })
  heroTitle: string;

  @ApiProperty({ description: "Título de la sección de contacto" })
  letsTalkTitle: string;

  @ApiProperty({ description: "Descripción de la sección de contacto" })
  letsTalkDescription: string;

  @ApiProperty({ description: "Título de disponibilidad" })
  availabilityTitle: string;

  @ApiProperty({ description: "Título del estado actual" })
  currentStatusTitle: string;

  @ApiProperty({ description: "ID del usuario propietario" })
  userId: string;

  @ApiProperty({ description: "Título de la sección de ubicación" })
  locationTitle: string;

  @ApiProperty({ type: [SkillDto], description: "Oportunidades de trabajo" })
  opportunities: SkillDto[];

  @ApiProperty({ type: [SkillDto], description: "Información de ubicación" })
  locationInfo: SkillDto[];

  @ApiProperty({ description: "Fecha de creación" })
  createdAt: Date;

  @ApiProperty({ description: "Fecha de última actualización" })
  updatedAt: Date;
}

export class PortfolioResponseDto {
  @ApiProperty({
    type: AboutDto,
    description: "Información personal del usuario",
  })
  about: AboutDto;

  @ApiProperty({
    type: SkillsByCategoryDto,
    description: "Skills organizadas por categoría",
  })
  skills: SkillsByCategoryDto;

  @ApiProperty({ type: [AchievementDto], description: "Lista de logros" })
  achievements: AchievementDto[];

  @ApiProperty({ type: [LanguageDto], description: "Lista de idiomas" })
  languages: LanguageDto[];

  @ApiProperty({ type: [ProjectDto], description: "Lista de proyectos" })
  projects: ProjectDto[];

  @ApiProperty({ type: ContactDto, description: "Información de contacto" })
  contact: ContactDto;
}

class CtaButtonsDto {
  @ApiProperty({ description: "Texto del botón de proyectos" })
  @IsString()
  @IsNotEmpty()
  projects: string;

  @ApiProperty({ description: "Texto del botón de contacto" })
  @IsString()
  @IsNotEmpty()
  contact: string;
}

class StatsItemDto {
  @ApiProperty({ description: "Título de la estadística" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "Subtítulo de la estadística" })
  @IsString()
  @IsNotEmpty()
  subtitle: string;
}

class StatsDto {
  @ApiProperty({ description: "Estadísticas de proyectos" })
  @IsObject()
  @ValidateNested()
  @Type(() => StatsItemDto)
  projects: StatsItemDto;

  @ApiProperty({ description: "Estadísticas de tecnologías" })
  @IsObject()
  @ValidateNested()
  @Type(() => StatsItemDto)
  technologies: StatsItemDto;

  @ApiProperty({ description: "Estadísticas de idiomas" })
  @IsObject()
  @ValidateNested()
  @Type(() => StatsItemDto)
  languages: StatsItemDto;
}

export class UpdateAboutDto {
  @ApiProperty({ description: "Nombre completo del usuario" })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: "Ubicación del usuario" })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: "Biografía del usuario" })
  @IsString()
  @IsNotEmpty()
  biography: string;

  @ApiProperty({ description: "Descripción de la página" })
  @IsString()
  @IsNotEmpty()
  pageDescription: string;

  @ApiProperty({ description: "Meta descripción para SEO" })
  @IsString()
  @IsNotEmpty()
  metaDescription: string;

  @ApiProperty({ description: "Título principal" })
  @IsString()
  @IsNotEmpty()
  heroTitle: string;

  @ApiProperty({ description: "Subtítulo principal" })
  @IsString()
  @IsNotEmpty()
  heroSubtitle: string;

  @ApiProperty({ description: "URL del avatar" })
  @IsString()
  @IsNotEmpty()
  avatarUrl: string;

  @ApiProperty({ description: "Estado de reubicación" })
  @IsString()
  @IsNotEmpty()
  relocationStatus: string;

  @ApiProperty({ description: "Botones de llamada a la acción" })
  @IsObject()
  @ValidateNested()
  @Type(() => CtaButtonsDto)
  ctaButtons: CtaButtonsDto;

  @ApiProperty({ description: "Estadísticas del portfolio" })
  @IsObject()
  @ValidateNested()
  @Type(() => StatsDto)
  stats: StatsDto;
}
