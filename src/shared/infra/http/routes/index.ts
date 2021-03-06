import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes); // Usando a rota criada em routes.
// Com isso, todos os métodos POST, GET, etc, serão passados para o nosso server.

router.use("/specifications", specificationsRoutes);

router.use("/users", usersRoutes);

router.use("/cars", carsRoutes);

router.use("/rentals", rentalRoutes);

router.use(authenticateRoutes); // sem o ptah, fica tudo pra dentro das /sessions

export { router };
