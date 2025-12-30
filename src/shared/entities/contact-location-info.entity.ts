import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Contact } from './contact.entity';
import { Exclude } from 'class-transformer';

@Entity('contact_location_info')
export class ContactLocationInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'contactId' })
  contactId: string;

  @ManyToOne(() => Contact, (contact) => contact.locationInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contactId' })
  @Exclude()
  contact: Contact;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
