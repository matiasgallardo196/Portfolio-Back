import { IsOptional, IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAboutDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: 'New York, USA', description: 'Location', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 'Full-stack developer...', description: 'Biography', required: false })
  @IsOptional()
  @IsString()
  biography?: string;

  @ApiProperty({ example: 'My Portfolio', description: 'Page description', required: false })
  @IsOptional()
  @IsString()
  pageDescription?: string;

  @ApiProperty({ example: 'Portfolio - John Doe', description: 'Meta description', required: false })
  @IsOptional()
  @IsString()
  metaDescription?: string;

  @ApiProperty({ example: 'Welcome to my portfolio', description: 'Hero title', required: false })
  @IsOptional()
  @IsString()
  heroTitle?: string;

  @ApiProperty({ example: 'Full-stack Developer', description: 'Hero subtitle', required: false })
  @IsOptional()
  @IsString()
  heroSubtitle?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'Avatar URL', required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ example: 'Open to relocation', description: 'Relocation status', required: false })
  @IsOptional()
  @IsString()
  relocationStatus?: string;

  @ApiProperty({ description: 'CTA buttons configuration', required: false })
  @IsOptional()
  @IsObject()
  ctaButtons?: any;

  @ApiProperty({ description: 'Stats configuration', required: false })
  @IsOptional()
  @IsObject()
  stats?: any;
}
