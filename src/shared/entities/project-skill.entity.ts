import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Project } from './project.entity';
import { Skill } from './skill.entity';

@Entity('project_skills')
@Unique(['projectId', 'skillId'])
export class ProjectSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'projectId' })
  projectId: string;

  @Column({ name: 'skillId' })
  skillId: string;

  @ManyToOne(() => Project, (project) => project.projectSkills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @ManyToOne(() => Skill, (skill) => skill.projectSkills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skillId' })
  skill: Skill;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
