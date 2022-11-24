import { AppDataSource } from "./data-source";
import routes from "./routes";
import express from "express";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware";

AppDataSource.initialize().then(() => {
  const app = express();
  const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(routes);

  app.use(errorMiddleware);

  return app.listen(process.env.PORT);
});
