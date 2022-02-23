import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes); // Usando a rota criada em routes.
// Com isso, todos os métodos POST, GET, etc, serão passados para o nosso server.

app.use("/specifications", specificationsRoutes);

app.listen(3333, () => console.log("Server is running!"));
