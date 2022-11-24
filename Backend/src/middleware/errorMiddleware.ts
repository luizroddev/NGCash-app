import { NextFunction, Request, Response } from "express"
import { APIError } from "../helpers/api-errors"

export default function errorMiddleware(
	error: Error & Partial<APIError>,
	req: Request,
	res: Response,
	next: NextFunction
) {
	const statusCode = error.statusCode ?? 500
	const message = error.statusCode ? error.message : "Internal Server Error"
	Promise.resolve()
		.then(() => {
			res.status(statusCode).json({ message })
		})
		.catch(next) // Errors will be passed to Express.
	return
}
