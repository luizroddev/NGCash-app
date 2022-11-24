import { useRef, useState } from "react"
import Input from "../../../../components/Input/Input"
import { useUserData } from "../../../../context/user"
import { currencyFormatter } from "../../../../helpers/currencyHelper"
import createTransaction from "../../../../services/createTransaction"

import styles from "./CashIn.module.scss"

export default function CashIn() {
	const [creditedUsername, setCreditedUsername] = useState<string>("")

	const [creditedValue, setCreditedValue] = useState<number>(0)
	const [errorMessage, setErrorMessage] = useState<string>()
	const [successMessage, setSuccessMessage] = useState<string>()

	const [isLoading, setLoading] = useState<boolean>(false)

	const { createCashIn } = useUserData()

	const handleSubmit = async () => {
		if (creditedUsername.length > 0 && creditedValue > 0) {
			setLoading(true)

			const transaction = await createCashIn(creditedUsername, creditedValue)
			if (transaction.error) {
				setErrorMessage(transaction.error)
			} else {
				setSuccessMessage(`Cash-In realizado para ${creditedUsername} no valor de R$ ${creditedValue} com sucesso!`)
				setErrorMessage("")
			}

			setLoading(false)
			setCreditedUsername("")
			setCreditedValue(0)
		} else {
			setErrorMessage("Digite um usuário válido e um número maior que zero.")
		}
	}

	return (
		<div className={styles.container}>
			<form
				onSubmit={e => {
					e.preventDefault()
				}}
			>
				{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
				{successMessage && !errorMessage && <p className={styles.successMessage}>{successMessage}</p>}
				<Input label="Digite o nome de usuário para quem deseja fazer um cash-out" name="cashin_user" placeholder="Nome do usuário" onChange={e => setCreditedUsername(e.target.value)} value={creditedUsername}></Input>

				<Input
					label="Digite valor que deseja enviar"
					name="cashin_value"
					placeholder="R$ 10,00"
					type="number"
					min="1"
					step="any"
					onChange={e => {
						if (!isNaN(Number(e.target.value))) {
							setCreditedValue(Number(e.target.value))
						}
					}}
					value={creditedValue}
				></Input>

				<button type="submit" onClick={handleSubmit} disabled={isLoading}>
					Fazer transferência
				</button>
			</form>
		</div>
	)
}
