import { NextFunction, Request, Response } from "express"

import { AppDataSource } from "../data-source"
import { Account } from "../entities/Account"
import { Transaction } from "../entities/Transaction"
import { User } from "../entities/User"
import { BadRequestError, NotFoundError, UnathorizedError } from "../helpers/api-errors"

export class AccountController {
	// Back-end.TO-DO 6
	async get(req: Request, res: Response, next: NextFunction) {
		const accountRepo = AppDataSource.getRepository(Account)

		const { userId } = req

		const userAccountExists = await accountRepo.findOneBy({
			id: Number(userId),
		})

		if (!userAccountExists) {
			return res.status(400).json({ message: "Essa conta de usuário não existe" })
		}

		try {
			return res.status(201).json(userAccountExists)
		} catch (error) {
			return res.status(401)
		}
	}

	// Back-end.TO-DO 7 e 8
	async cash_out(req: Request, res: Response, next: NextFunction) {
		const userRepo = AppDataSource.getRepository(User)
		const accountRepo = AppDataSource.getRepository(Account)
		const transactionRepo = AppDataSource.getRepository(Transaction)

		const { userId, params } = req
		console.log(params)
		const { creditedUsername, value } = params

		const userAccount = await accountRepo.findOneBy({
			id: Number(userId),
		})

		if (!userAccount) {
			return next(new NotFoundError("Essa conta de usuário não existe"))
		}

		const creditedUser = await userRepo.findOneBy({
			username: creditedUsername,
		})

		if (!creditedUser) {
			return next(new NotFoundError("Esse usuário não existe"))
		}

		const creditedAccount = await accountRepo.findOneBy({
			id: Number(creditedUser.id),
		})

		if (!creditedAccount) {
			return next(new NotFoundError("Essa conta de usuário não existe"))
		}

		if (userAccount.id === creditedUser.id) {
			return next(new BadRequestError("Você não pode relizar um cash-in para si mesmo"))
		}

		if (Number(value) < 0) {
			return next(new BadRequestError("O valor do cash-in precisa ser maior que 0"))
		}

		if (Number(value) > Number(userAccount.balance)) {
			return next(new BadRequestError("Você não possui saldo suficiente"))
		}

		try {
			const transaction = transactionRepo.create({
				creditedAccount: creditedAccount,
				debitedAccount: userAccount,
				value: Number(value),
			})

			const userBalance = String(Number(userAccount.balance) - Number(value))
			const creditedUserBalance = String(Number(creditedAccount.balance) + Number(value))

			await accountRepo.save({ ...userAccount, balance: userBalance })
			await accountRepo.save({
				...creditedAccount,
				balance: creditedUserBalance,
			})

			await transactionRepo.save(transaction)

			return res.status(201).json(transaction)
		} catch (error) {
			console.log(error)
			return next(new UnathorizedError("Unathorized"))
		}
	}
}
