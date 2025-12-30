import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('about')
export class About {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'fullName' })
  fullName: string;

  @Column()
  location: string;

  @Column('text')
  biography: string;

  @Column({ name: 'pageDescription' })
  pageDescription: string;

  @Column({ name: 'metaDescription' })
  metaDescription: string;

  @Column({ name: 'heroTitle' })
  heroTitle: string;

  @Column({ name: 'heroSubtitle' })
  heroSubtitle: string;

  @Column({ name: 'avatarUrl' })
  avatarUrl: string;

  @Column({ name: 'relocationStatus' })
  relocationStatus: string;

  @Column({ name: 'ctaButtons', type: 'jsonb' })
  ctaButtons: any;

  @Column({ type: 'jsonb' })
  stats: any;

  @Column({ name: 'userId', unique: true })
  userId: string;

  @OneToOne(() => User, (user) => user.about, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
