import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import {
  User,
  About,
  Skill,
  Achievement,
  Language,
  Project,
  Contact,
} from "../entities";
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  NODE_ENV,
} from "./env.loader";

export const databaseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: DB_HOST || "localhost",
  port: DB_PORT,
  username: DB_USERNAME || "postgres",
  password: DB_PASSWORD || "password",
  database: DB_NAME || "portfolio_db",
  entities: [User, About, Skill, Achievement, Language, Project, Contact],
  synchronize: NODE_ENV !== "production", // Solo en desarrollo
  logging: /*NODE_ENV !== "production"*/ false,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  dropSchema: false,
};
