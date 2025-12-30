import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'johndoe', description: 'Username (min 3 characters)' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: 'password123', description: 'User password (min 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'password123', description: 'Confirm password (must match password)' })
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
