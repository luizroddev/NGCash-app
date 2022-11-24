import { IUser } from "../@types/IUser"
import { isValidPasswordRequirements } from "../validations/passwordValidations"
import { isValidUsername } from "../validations/usernameValidations"
import createUserToken from "./createUserToken"

interface Response {
	data?: any
	error?: string
}

export default async function createUser(user: IUser): Promise<Response> {
	const { username, password } = user

	if (!username) {
		return { error: "É necessário preencher o nome de usuário." }
	}

	if (!isValidUsername(username)) {
		return { error: "O nome de usuário precisa ser maior que 3 caracteres." }
	}

	if (!password) {
		return { error: "É necessário preencher a senha." }
	}

	if (!isValidPasswordRequirements(password)) {
		return {
			error: "A senha precisa ter ao menos 8 caracteres, um número e uma letra maiúscula.",
		}
	}

	return await fetch("http://localhost:7777/user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then(response => response.json())
		.then(async data => {
			if (data.message) {
				return { error: data.message }
			}
			await createUserToken(user)
			return { data }
		})
		.catch(error => {
			console.error("Erro:", error)
			return { error }
		})
}
