import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";

const JWT_TOKEN = process.env.JWT_TOKEN as string;
export class AuthController {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    const authRepo = AppDataSource.getRepository(User);
    const { username, password } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "O nome de usuário não pode estar vázio" });
    }

    if (!password) {
      return res.status(400).json({ message: "A senha não pode estar vázia" });
    }

    const user = await authRepo.findOneBy({ username });

    if (!user) {
      return res.status(404).json({ message: "O usuário não existe" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "A senha está incorreta" });
    }

    // Back-end.TO-DO 5
    if (JWT_TOKEN) {
      const token = jwt.sign({ id: user.id }, JWT_TOKEN, { expiresIn: "1d" });

      const { password: _, ...authUser } = user;
      return res.json({ user: authUser, token });
    }
  }
}
