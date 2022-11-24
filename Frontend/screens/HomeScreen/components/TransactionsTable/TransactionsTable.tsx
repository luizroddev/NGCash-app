import { useEffect, useState } from "react"
import { Transactions, UserTransactions } from "../../../../@types/ITransaction"
import { useAuth } from "../../../../context/auth"
import { useUserData } from "../../../../context/user"
import { currencyFormatter } from "../../../../helpers/currencyHelper"
import { formatDate } from "../../../../helpers/dateHelper"
import ButtonTableOptions from "../ButtonTableOptions/ButtonTableOptions"

import styles from "./TransactionsTable.module.scss"

export default function TransactionsTable() {
	const { user } = useAuth()
	const { transactions: transactionsData } = useUserData()

	const [userTransactions, setUserTransactions] = useState<UserTransactions | null>()

	const [recentTransactions, setRecentTransactions] = useState<Transactions[]>([])
	const [currentTransactionsMode, setCurrentTransactionsMode] = useState<"all" | "cash_in" | "cash_out">("all")

	const [dateFilterByOlder, setDateFilterByOlder] = useState<boolean>(true)

	useEffect(() => {
		if (transactionsData) {
			setUserTransactions(transactionsData)
			setRecentTransactions(prevState => [...filterTransacitons(transactionsData.transactions)])
		}
	}, [transactionsData])

	useEffect(() => {
		if (userTransactions) {
			switch (currentTransactionsMode) {
				case "all":
					return setRecentTransactions(filterTransacitons(userTransactions.transactions))
				case "cash_in":
					return setRecentTransactions(filterTransacitons(userTransactions.cashInTransactions))
				case "cash_out":
					return setRecentTransactions(filterTransacitons(userTransactions.cashOutTransactions))
			}
		}
	}, [currentTransactionsMode])

	const filterTransacitons = (transactions: Transactions[]) => {
		const filtered = transactions.sort((a, b) => {
			if (dateFilterByOlder) {
				return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			} else {
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			}
		})

		return [...filtered]
	}

	const handledateFilterByOlder = () => {
		setDateFilterByOlder(prevState => {
			return !prevState
		})
	}

	useEffect(() => {
		setRecentTransactions(prevState => {
			return filterTransacitons(recentTransactions)
		})
	}, [dateFilterByOlder])

	return (
		<>
			<div className={styles.table_options}>
				<ButtonTableOptions setCurrentTransactionsMode={setCurrentTransactionsMode} currentTransactionsMode={currentTransactionsMode} />
			</div>

			<table>
				<thead>
					<tr>
						<th>Nome do usuário</th>
						<th>Valor</th>
						<th>
							<button
								className={styles.date_filter}
								onClick={() => {
									handledateFilterByOlder()
								}}
							>
								Data ({dateFilterByOlder ? "mais antigos " : "mais recentes "})
							</button>
						</th>
						<th>Tipo</th>
					</tr>
				</thead>
				<tbody>
					{recentTransactions.map(transaction => {
						return (
							<tr key={transaction.id}>
								<td>{transaction.debitedUser == user?.username ? transaction.creditedUser : transaction.debitedUser}</td>
								<td>{currencyFormatter.format(transaction.value)}</td>
								<td>{formatDate(transaction.createdAt)}</td>
								<td>{transaction.debitedUser == user?.username ? "Cash-Out" : "Cash-In"}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}
