import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcryptjs";

import { Account } from "./Account";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  username: string;

  @Column({ type: "text" })
  password: string;

  @OneToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: "accountId" })
  accountId: number;

  // Back-end.TO-DO 3
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
