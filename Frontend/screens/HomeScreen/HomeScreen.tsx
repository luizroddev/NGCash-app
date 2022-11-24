import { useEffect, useState } from "react"

import IAccount from "../../@types/IAccount"
import Navbar from "../../components/Navbar/Navbar"
import { useUserData } from "../../context/user"
import { currencyFormatter } from "../../helpers/currencyHelper"
import getAccount from "../../services/getAccount"
import CashIn from "./components/CashIn/CashIn"
import TransactionsTable from "./components/TransactionsTable/TransactionsTable"

import styles from "./HomeScreen.module.scss"

export default function HomeScreen() {
	const { account } = useUserData()

	return (
		<div className={styles.wrapper}>
			<Navbar />

			<main className={styles.container}>
				<section className={styles.left_container}>
					<div className={styles.balance}>
						<h2>SALDO ATUAL</h2>
						<h1>{account ? currencyFormatter.format(Number(account.balance)) : "R$ ----"}</h1>
					</div>

					<section className={styles.cash_in}>
						<h1 className={styles.section_title}>Enviar cash-in</h1>

						<CashIn />
					</section>
				</section>

				<section className={styles.transactions}>
					<h1 className={styles.section_title}>Transferências recentes</h1>

					<TransactionsTable />
				</section>
			</main>
		</div>
	)
}
