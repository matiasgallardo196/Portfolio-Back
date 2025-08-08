import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Skill } from "./skill.entity";
import { User } from "./user.entity";

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column()
  githubUrl: string;

  @Column({ nullable: true })
  demoUrl: string;

  @Column()
  imageUrl: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToMany(() => Skill)
  @JoinTable({
    name: "project_skills",
    joinColumn: {
      name: "projectId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "skillId",
      referencedColumnName: "id",
    },
  })
  technologies: Skill[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
