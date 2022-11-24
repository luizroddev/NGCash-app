import { useRouter } from "next/router"
import { FormEvent, useState } from "react"

import { IUser } from "../../@types/IUser"
import Input from "../../components/Input/Input"
import Navbar from "../../components/Navbar/Navbar"
import { useAuth } from "../../context/auth"

import styles from "./LoginScreen.module.scss"

export default function LoginScreen() {
	const [user, setUser] = useState<IUser>({
		username: "",
		password: "",
	})

	const [errorMessage, setErrorMessage] = useState("")

	const router = useRouter()
	const { Login } = useAuth()

	const handleLogin = async (event: FormEvent) => {
		event.preventDefault()

		const response = await Login(user)
		if (response.error) {
			if (response.error.message) {
				setErrorMessage(response.error.message)
			} else {
				setErrorMessage(response.error)
			}
		} else {
			router.push("/")
		}
	}

	return (
		<>
			<div className={styles.wrapper}>
				<main className={styles.container}>
					<section className={styles.leftSection}>
						<Navbar />

						<div className={styles.headline}>
							<h1>
								Olá, seja bem vind@ de volta a <span>NG.CASH</span>
							</h1>
							<p>Desbloqueie a verdadeira perfomance de uma carteira digital.</p>
						</div>

						{errorMessage && (
							<div className={styles.errorMessage}>
								<p>{errorMessage}</p>
							</div>
						)}

						<form className={styles.registerForm} onSubmit={handleLogin}>
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
								Acessar minha conta
							</button>
						</form>
						<button
							onClick={() => {
								router.push("/register")
							}}
							className={styles.createAccountButton}
						>
							Não possui uma conta? Crie agora
						</button>
					</section>

					<section className={styles.rightSection}>
						<img src="./images/ngCashLogin.png" alt="NGCash App" />
					</section>
				</main>
			</div>
		</>
	)
}
