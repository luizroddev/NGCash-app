import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const JWT_TOKEN = process.env.JWT_TOKEN as string

interface TokenPayload {
	id: string
	iat: number
	exp: number
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({ message: "Sua sessão expirou, faça login novamente." })
	}

	const token = authorization.replace("Bearer", "").trim()

	try {
		const data = jwt.verify(token, JWT_TOKEN)
		const { id } = data as TokenPayload
		req.userId = id

		return next()
	} catch (error) {
		return res.status(401).json({ message: "Sua sessão expirou, faça login novamente." })
	}
}
