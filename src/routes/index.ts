import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";

const router = Router();

router.use("/categories", categoriesRoutes); // Usando a rota criada em routes.
// Com isso, todos os métodos POST, GET, etc, serão passados para o nosso server.

router.use("/specifications", specificationsRoutes);

export { router };
