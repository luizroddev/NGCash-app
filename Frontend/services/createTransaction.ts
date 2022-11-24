import APIResponse from "../@types/IAPIResponse"

export default async function createTransaction(userId: string, value: number): Promise<APIResponse> {
	return await fetch(`http://localhost:7777/account/${userId}/${value}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("@NGCash:token"),
		},
	})
		.then(response => response.json())
		.then(data => {
			if (data.message) {
				return { error: data.message }
			}
			return { data: { data } }
		})
		.catch(error => {
			return { error }
		})
}
