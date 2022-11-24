import { Router } from "express";
import { AccountController } from "./controllers/AccountController";
import { AuthController } from "./controllers/AuthController";
import { TransactionController } from "./controllers/TransactionController";
import { UserController } from "./controllers/UserController";
import authMiddleware from "./middleware/authMiddleware";
import errorMiddleware from "./middleware/errorMiddleware";

const routes = Router();

routes.post("/user", new UserController().create);
routes.get("/user/:userId", authMiddleware, new UserController().get);

routes.post("/auth", errorMiddleware, new AuthController().authenticate);

routes.post(
  "/account/:creditedUsername/:value",
  authMiddleware,
  new AccountController().cash_out
);

routes.get("/account", authMiddleware, new AccountController().get);
routes.get("/transaction", authMiddleware, new TransactionController().get);

export default routes;
