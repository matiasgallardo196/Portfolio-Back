import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  // Relación 1:1 con About
  @OneToOne("About", "user")
  about: any;

  // Relación 1:N con Skills
  @OneToMany("Skill", "user")
  skills: any[];

  // Relación 1:N con Achievements
  @OneToMany("Achievement", "user")
  achievements: any[];

  // Relación 1:N con Languages
  @OneToMany("Language", "user")
  languages: any[];

  // Relación 1:N con Projects
  @OneToMany("Project", "user")
  projects: any[];

  // Relación 1:1 con Contact
  @OneToOne("Contact", "user")
  contact: any;
}
