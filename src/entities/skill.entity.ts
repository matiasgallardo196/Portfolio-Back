import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

export enum SkillCategory {
  LANGUAGES = "languages",
  FRONTEND = "frontend",
  BACKEND = "backend",
  DATABASES = "databases",
  DEVOPS = "devops",
  INTEGRATIONS = "integrations",
  PRACTICES = "practices",
}

@Entity("skills")
export class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: SkillCategory,
    default: SkillCategory.PRACTICES,
  })
  category: SkillCategory;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.skills)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
