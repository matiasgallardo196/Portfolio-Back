import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { About } from './about.entity';
import { Project } from './project.entity';
import { Skill } from './skill.entity';
import { Language } from './language.entity';
import { Achievement } from './achievement.entity';
import { Contact } from './contact.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: 'isActive', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @OneToOne(() => About, (about) => about.user, { cascade: true })
  about: About;

  @OneToMany(() => Project, (project) => project.user, { cascade: true })
  projects: Project[];

  @OneToMany(() => Skill, (skill) => skill.user, { cascade: true })
  skills: Skill[];

  @OneToMany(() => Language, (language) => language.user, { cascade: true })
  languages: Language[];

  @OneToMany(() => Achievement, (achievement) => achievement.user, { cascade: true })
  achievements: Achievement[];

  @OneToOne(() => Contact, (contact) => contact.user, { cascade: true })
  contact: Contact;
}
