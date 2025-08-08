import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "../../config/database.config";
import { DatabaseService } from "./database.service";
import {
  User,
  About,
  Skill,
  Achievement,
  Language,
  Project,
  Contact,
} from "../../entities";

console.log("🚀 Inicializando módulo de base de datos...");

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
      // Agregar callback para verificar conexión
      extra: {
        connectionTimeoutMillis: 5000,
      },
    }),
    TypeOrmModule.forFeature([
      User,
      About,
      Skill,
      Achievement,
      Language,
      Project,
      Contact,
    ]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
