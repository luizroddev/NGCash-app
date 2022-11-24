import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Account } from "../entities/Account"
import { User } from "../entities/User"
import { BadRequestError, NotFoundError, UnathorizedError } from "../helpers/api-errors"
import { isValidPasswordRequirements } from "../validations/passwordValidations"
import { isValidUsername } from "../validations/usernameValidations"

export class UserController {
	async create(req: Request, res: Response, next: NextFunction) {
		const userRepo = AppDataSource.getRepository(User)
		const accountRepo = AppDataSource.getRepository(Account)

		const { username, password } = req.body

		if (!username) {
			return next(new BadRequestError("O nome de usuário é obrigatório"))
		}

		if (!password) {
			return next(new BadRequestError("A senha é obrigatório"))
		}

		// Back-end.TO-DO 2
		if (!isValidUsername(username)) {
			return next(new BadRequestError("O nome de usuário precisa ser maior que 3 caracteres"))
		}

		// Back-end.TO-DO 3
		if (!isValidPasswordRequirements(password)) {
			return next(
				new BadRequestError("A senha precisa ter ao menos 8 caracteres, um número e uma letra maiúscula")
			)
		}

		const userExists = await userRepo.findOneBy({ username })

		if (userExists) {
			return next(new BadRequestError("Esse nome de usuário já existe"))
		}

		// Back-end.TO-DO 4
		try {
			const newAccount = accountRepo.create({ balance: "100" })
			await accountRepo.save(newAccount)

			const newUser = userRepo.create({
				username,
				password,
				accountId: newAccount.id,
			})
			await userRepo.save(newUser)

			return res.status(201).json(newUser)
		} catch (error) {
			return next(new UnathorizedError("Unathorized"))
		}
	}

	async get(req: Request, res: Response, next: NextFunction) {
		const userRepo = AppDataSource.getRepository(User)

		const { userId } = req.params

		if (!userId) {
			return next(new NotFoundError("Esse id de usuário não existe"))
		}

		const userExists = await userRepo.findOneBy({
			id: Number(userId),
		})

		if (!userExists) {
			return next(new NotFoundError("Esse usuário não existe"))
		}

		const { password, ...resUser } = userExists
		try {
			return res.status(201).json(resUser)
		} catch (error) {
			return res.status(401).json({ message: "Sua sessão expirou ou não é válida, faça login novamente." })
		}
	}
}
