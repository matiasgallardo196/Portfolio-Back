import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ProjectSkill } from './project-skill.entity';

export enum SkillCategory {
  LANGUAGES = 'languages',
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  DATABASES = 'databases',
  DEVOPS = 'devops',
  INTEGRATIONS = 'integrations',
  PRACTICES = 'practices',
}

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: SkillCategory,
    default: SkillCategory.PRACTICES,
  })
  category: SkillCategory;

  @Column({ name: 'userId' })
  userId: string;

  @ManyToOne(() => User, (user) => user.skills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => ProjectSkill, (projectSkill) => projectSkill.skill)
  projectSkills: ProjectSkill[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
