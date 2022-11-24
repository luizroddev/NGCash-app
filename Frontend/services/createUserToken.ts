import APIResponse from "../@types/IAPIResponse"
import { IUser } from "../@types/IUser"

export default async function createUserToken(user: IUser): Promise<APIResponse> {
	let error = ""

	return await fetch("http://localhost:7777/auth", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then(response => response.json())
		.then(data => {
			if (data.message) {
				error = data.message
				return { error: data.message }
			}

			localStorage.setItem("@NGCash:user", JSON.stringify(data.user))
			localStorage.setItem("@NGCash:token", data.token)
			return { data } as APIResponse
		})
		.catch(error => {
			console.error("Erro:", error)
			return { error } as APIResponse
		})
		.finally(() => {
			return error ? { error } : { error: "Ocorreu um erro, tente novamente" }
		})
}
