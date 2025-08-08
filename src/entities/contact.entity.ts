import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Skill } from "./skill.entity";
import { User } from "./user.entity";

@Entity("contact")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  linkedin: string;

  @Column()
  github: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column()
  metaDescription: string;

  @Column()
  pageTitle: string;

  @Column()
  heroTitle: string;

  @Column()
  letsTalkTitle: string;

  @Column("text")
  letsTalkDescription: string;

  @Column()
  availabilityTitle: string;

  @Column()
  currentStatusTitle: string;

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.contact)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToMany(() => Skill)
  @JoinTable({
    name: "contact_opportunities",
    joinColumn: {
      name: "contactId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "skillId",
      referencedColumnName: "id",
    },
  })
  opportunities: Skill[];

  @Column()
  locationTitle: string;

  @ManyToMany(() => Skill)
  @JoinTable({
    name: "contact_location_info",
    joinColumn: {
      name: "contactId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "skillId",
      referencedColumnName: "id",
    },
  })
  locationInfo: Skill[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
