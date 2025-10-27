import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column({ length: 100 })
  name!: string;

  @Index({ unique: true })
  @Column({ length: 200 })
  email!: string;

  @Column({ type: "integer", nullable: true })
  age?: number | null;

  @Column({ default: "active" })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
