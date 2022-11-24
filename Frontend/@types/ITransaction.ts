export interface ITransaction {
	id: string
	debitedAccountId: number
	creditedAccountId: number
	value: number
	createdAt: Date
}

export interface IUserTransactions {
	transactions: ITransaction[]
	cashInTransactions: ITransaction[]
	cashOutTransactions: ITransaction[]
}

export interface Transactions extends ITransaction {
	debitedUser: string
	creditedUser: string
}

export interface UserTransactions {
	transactions: Transactions[]
	cashInTransactions: Transactions[]
	cashOutTransactions: Transactions[]
}
