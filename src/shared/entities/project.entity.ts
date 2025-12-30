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
import { Exclude } from 'class-transformer';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ name: 'githubUrl' })
  githubUrl: string;

  @Column({ name: 'demoUrl', nullable: true })
  demoUrl: string;

  @Column({ name: 'imageUrl' })
  imageUrl: string;

  @Column({ name: 'userId' })
  userId: string;

  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Exclude()
  user: User;

  @OneToMany(() => ProjectSkill, (projectSkill) => projectSkill.project, { cascade: true })
  projectSkills: ProjectSkill[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
