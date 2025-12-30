import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DATABASE_URL,
  IS_DEVELOPMENT,
} from '../../config/env.loader';
import {
  User,
  About,
  Project,
  Skill,
  ProjectSkill,
  Language,
  Achievement,
  Contact,
  ContactOpportunity,
  ContactLocationInfo,
} from '../../shared/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DATABASE_URL,
      entities: [
        User,
        About,
        Project,
        Skill,
        ProjectSkill,
        Language,
        Achievement,
        Contact,
        ContactOpportunity,
        ContactLocationInfo,
      ],
      synchronize: false, // Never set to true in production
      logging: IS_DEVELOPMENT,
    }),
  ],
})
export class DatabaseModule {}
