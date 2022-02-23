// Cada tabela da nossa aplicação terá um arquivo routes que representará sua devida rota
// Criaremos a rota para ai sim ser usada dentro do server.ts (com app.use())
import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory/index";
import { listCategoryController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

// const categoriesRepository = new CategoriesRepository(); // Instanciando a classe, logo categoriesRepository terá todos os métodos da classe.

// Nossa categoria recebera um 'name' e um 'description'.
categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoryController.handle(request, response);
});

export { categoriesRoutes };
