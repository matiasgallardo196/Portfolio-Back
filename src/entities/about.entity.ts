import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("about")
export class About {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fullName: string;

  @Column()
  location: string;

  @Column("text")
  biography: string;

  @Column()
  pageDescription: string;

  @Column()
  metaDescription: string;

  @Column()
  heroTitle: string;

  @Column()
  heroSubtitle: string;

  @Column()
  avatarUrl: string;

  @Column()
  relocationStatus: string;

  @Column("json")
  ctaButtons: {
    projects: string;
    contact: string;
  };

  @Column("json")
  stats: {
    projects: {
      title: string;
      subtitle: string;
    };
    technologies: {
      title: string;
      subtitle: string;
    };
    languages: {
      title: string;
      subtitle: string;
    };
  };

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.about)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
