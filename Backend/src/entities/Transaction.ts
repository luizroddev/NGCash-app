import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "./Account"

@Entity("transactions")
export class Transaction {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	debitedAccountId: number

	@Column()
	creditedAccountId: number

	@ManyToOne(() => Account)
	@JoinColumn({ name: "debitedAccountId" })
	debitedAccount: Account

	@ManyToOne(() => Account)
	@JoinColumn({ name: "creditedAccountId" })
	creditedAccount: Account

	@Column({ type: "double precision" })
	value: number

	@CreateDateColumn()
	createdAt: Date
}
