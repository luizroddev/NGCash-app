import { NextFunction, Request, Response } from "express"

import { AppDataSource } from "../data-source"
import { Transaction } from "../entities/Transaction"
import { User } from "../entities/User"
import { BadRequestError, NotFoundError, UnathorizedError } from "../helpers/api-errors"

export class TransactionController {
	// Back-end.TO-DO 9
	async get(req: Request, res: Response, next: NextFunction) {
		const transactionRepo = AppDataSource.getRepository(Transaction)
		const userRepo = AppDataSource.getRepository(User)

		const { userId } = req

		const userExists = await userRepo.findOneBy({ id: Number(userId) })

		if (!userExists) {
			return next(new NotFoundError("Esse usuário não existe"))
		}

		const cashInTransactions = await transactionRepo.find({
			where: {
				creditedAccountId: Number(userId),
			},
		})

		const cashOutTransactions = await transactionRepo.find({
			where: {
				debitedAccountId: Number(userId),
			},
		})

		const formatTransactions = (arrayTransactions: Transaction[]) => {
			return arrayTransactions.map(async (transaction) => {
				const debitedUser = await userRepo.findOne({
					where: {
						id: transaction.debitedAccountId,
					},
					select: { username: true },
				})

				const creditedUser = await userRepo.findOne({
					where: {
						id: transaction.creditedAccountId,
					},
					select: { username: true },
				})

				const userTransaction = {
					...transaction,
					debitedUser: debitedUser?.username,
					creditedUser: creditedUser?.username,
				}

				return { ...transaction, ...userTransaction }
			})
		}

		const cashInTransactionsResults = await Promise.all(formatTransactions(cashInTransactions))
		const cashOutTransactionsResults = await Promise.all(formatTransactions(cashOutTransactions))

		try {
			return res.status(201).json({
				transactions: [...cashInTransactionsResults, ...cashOutTransactionsResults],
				cashInTransactions: cashInTransactionsResults,
				cashOutTransactions: cashOutTransactionsResults,
			})
		} catch (error) {
			return res.send(401).json({ message: "Internal Server Error" })
		}
	}
}
