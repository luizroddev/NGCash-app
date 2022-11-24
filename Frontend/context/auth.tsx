import React, { createContext, useState, useEffect, useContext, ReactNode } from "react"
import APIResponse from "../@types/IAPIResponse"
import { ICurrentUser, IUser } from "../@types/IUser"
import createUserToken from "../services/createUserToken"
import getUser from "../services/getUser"
import { useUserData } from "./user"

interface AuthContextData {
	signed: boolean
	user: ICurrentUser | null
	token: string | null
	Login(user: IUser): Promise<APIResponse>
	Logout(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export interface AuthProviderProps {
	children?: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
	const { updateUser } = useUserData()

	const [user, setUser] = useState<ICurrentUser | null>(null)
	const [token, setToken] = useState<string | null>(null)

	const validateToken = async (userId: string) => {
		return await getUser(userId)
	}

	useEffect(() => {
		const storagedUser = localStorage.getItem("@NGCash:user")
		const storagedToken = localStorage.getItem("@NGCash:token")

		if (storagedToken && storagedUser) {
			const tokenValidated = validateToken(JSON.parse(storagedUser).id)
			tokenValidated.then(responseToken => {
				if (!responseToken.error) {
					setUser(JSON.parse(storagedUser))
					setToken(storagedToken)
					updateUser()
				} else {
					Logout()
				}
			})
		}
	}, [])

	async function Login(userData: IUser) {
		const response = await createUserToken(userData)

		if (!response.error) {
			setUser(response.data.user)
			setToken(response.data.token)
			updateUser()
		}

		return response
	}

	function Logout() {
		setUser(null)
		setToken(null)

		localStorage.removeItem("@NGCash:token")
		localStorage.removeItem("@NGCash:user")
	}

	return <AuthContext.Provider value={{ signed: Boolean(user), user, token, Login, Logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const context = useContext(AuthContext)

	return context
}
