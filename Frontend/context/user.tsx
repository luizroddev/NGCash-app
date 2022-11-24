import { createContext, ReactNode, useContext, useEffect, useState } from "react"

import IAccount from "../@types/IAccount"
import APIResponse from "../@types/IAPIResponse"
import { Transactions, UserTransactions } from "../@types/ITransaction"
import { ICurrentUser, IUser } from "../@types/IUser"
import createTransaction from "../services/createTransaction"
import getAccount from "../services/getAccount"
import getTransactions from "../services/getTransactions"
import getUser from "../services/getUser"
import { useAuth } from "./auth"

interface UserDataContextData {
	transactions: UserTransactions | undefined
	account: IAccount | undefined
	user: ICurrentUser | undefined
	updateUser: () => Promise<void>
	createCashIn(userId: string, value: number): any
}

const UserDataContext = createContext<UserDataContextData>({} as UserDataContextData)

export interface UserProviderProps {
	children?: ReactNode
}

export const UserDataProvider = ({ children }: UserProviderProps): JSX.Element => {
	const [user, setUser] = useState<ICurrentUser>()
	const [transactions, setTransactions] = useState<UserTransactions>()
	const [account, setAccount] = useState<IAccount>()

	const fetchUserData = async () => {
		const localUserString = localStorage.getItem("@NGCash:user")
		if (localUserString) {
			const localUser = JSON.parse(localUserString) as ICurrentUser
			const responseUser = await getUser(localUser.id)

			if (!responseUser.error) {
				setUser(responseUser.data)

				const responseAccount = await getAccount()
				const responseTransactions = await getTransactions()

				if (!responseAccount.error) {
					setAccount(responseAccount.data)
				}

				if (!responseTransactions.error) {
					setTransactions(responseTransactions.data)
				}
			}
		}
	}

	const updateUser = async () => {
		await fetchUserData()
	}

	async function createCashIn(userId: string, value: number) {
		const transaction = await createTransaction(userId, value)

		if (!transaction.error) {
			const responseTransactions = await getTransactions()

			if (!responseTransactions.error) {
				setTransactions(responseTransactions.data)
			}

			const responseAccount = await getAccount()

			if (!responseAccount.error) {
				setAccount(responseAccount.data)
			}
		}
		return transaction
	}

	return <UserDataContext.Provider value={{ user, transactions, account, createCashIn, updateUser }}>{children}</UserDataContext.Provider>
}

export function useUserData() {
	const context = useContext(UserDataContext)

	return context
}
