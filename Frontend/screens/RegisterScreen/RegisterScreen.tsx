import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"

import { IUser } from "../../@types/IUser"
import Input from "../../components/Input/Input"
import Navbar from "../../components/Navbar/Navbar"
import { useUserData } from "../../context/user"
import createUser from "../../services/createUser"

import styles from "./RegisterScreen.module.scss"

export default function RegisterScreen() {
	const [user, setUser] = useState<IUser>({
		username: "",
		password: "",
	})

	const [errorMessage, setErrorMessage] = useState("")

	const router = useRouter()

	const { user: userData, updateUser } = useUserData()

	const handleCreateAccount = async (event: FormEvent) => {
		event.preventDefault()

		const response = await createUser(user)
		if (response.error) {
			setErrorMessage(response.error)
		} else {
			await updateUser()
			router.push("/")
		}
	}

	// useEffect(() => {
	// 	console.log("userData", userData)
	// 	if (userData) {
	// 	}
	// }, [userData])

	return (
		<>
			<div className={styles.wrapper}>
				<main className={styles.container}>
					<section className={styles.leftSection}>
						<Navbar />

						<div className={styles.headline}>
							<h1>
								Comece sua jornada <span>NG.CASH</span>
							</h1>
							<p>Desbloqueie a verdadeira perfomance de uma carteira digital.</p>
						</div>

						{errorMessage && (
							<div className={styles.errorMessage}>
								<p>{errorMessage}</p>
							</div>
						)}

						<form className={styles.registerForm} onSubmit={handleCreateAccount}>
							<Input
								onChange={e => {
									setUser(oldUser => ({
										...oldUser,
										username: e.target.value,
									}))
								}}
								value={user.username}
								name="username"
								type="text"
								placeholder="Nome de usuário"
								label="Digite seu nome de usuário"
							></Input>
							<Input
								onChange={e => {
									setUser(oldUser => ({
										...oldUser,
										password: e.target.value,
									}))
								}}
								value={user.password}
								name="password"
								type="password"
								placeholder="Senha"
								label="Digite sua senha"
							></Input>

							<button type="submit" className={styles.submitButton}>
								Criar minha conta
							</button>
						</form>
						<button
							onClick={() => {
								router.push("/login")
							}}
							className={styles.createAccountButton}
						>
							Já possui uma conta? Entre agora
						</button>
					</section>

					<section className={styles.rightSection}>
						<img src="./images/ngCashRegister.png" alt="NGCash App" />
					</section>
				</main>
			</div>
		</>
	)
}
