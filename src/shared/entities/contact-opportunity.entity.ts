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

@Entity('contact_opportunities')
export class ContactOpportunity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'contactId' })
  contactId: string;

  @ManyToOne(() => Contact, (contact) => contact.opportunities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contactId' })
  @Exclude()
  contact: Contact;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
