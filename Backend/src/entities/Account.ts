import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("accounts")
export class Account {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "float" })
	balance: string
}
