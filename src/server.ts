import "reflect-metadata"; // Deve-se importar no topo
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./shared/container";

import "./database";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

// tratamento de erro com um middleware de error
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // verificar se o meu erro é do tipo da minha classe AppError
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    // se não for erro de request e sim da nossa aplicação faremos o seguinte return:
    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is running!"));
