import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ContactOpportunity } from './contact-opportunity.entity';
import { ContactLocationInfo } from './contact-location-info.entity';
import { Exclude } from 'class-transformer';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  linkedin: string;

  @Column()
  github: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ name: 'metaDescription' })
  metaDescription: string;

  @Column({ name: 'pageTitle' })
  pageTitle: string;

  @Column({ name: 'heroTitle' })
  heroTitle: string;

  @Column({ name: 'letsTalkTitle' })
  letsTalkTitle: string;

  @Column({ name: 'letsTalkDescription', type: 'text' })
  letsTalkDescription: string;

  @Column({ name: 'availabilityTitle' })
  availabilityTitle: string;

  @Column({ name: 'currentStatusTitle' })
  currentStatusTitle: string;

  @Column({ name: 'locationTitle' })
  locationTitle: string;

  @Column({ name: 'userId', unique: true })
  userId: string;

  @OneToOne(() => User, (user) => user.contact, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Exclude()
  user: User;

  @OneToMany(() => ContactOpportunity, (opportunity) => opportunity.contact, { cascade: true })
  opportunities: ContactOpportunity[];

  @OneToMany(() => ContactLocationInfo, (locationInfo) => locationInfo.contact, { cascade: true })
  locationInfo: ContactLocationInfo[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
