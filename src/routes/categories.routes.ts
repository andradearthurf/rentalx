// Cada tabela da nossa aplicação terá um arquivo routes que representará sua devida rota
// Criaremos a rota para ai sim ser usada dentro do server.ts (com app.use())
import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository(); // Instanciando a classe, logo categoriesRepository terá todos os métodos da classe.

// Nossa categoria recebera um 'name' e um 'description'.
categoriesRoutes.post("/", (request, response) => {
  // Não temos um modelo definido de quais parâmetros realmente fazem parte das
  // categories, por isso inserimos tipagem para as categories.
  const { name, description } = request.body;

  // A rota agora foi minimizada, fazendo com que a responsabilidade dela seja apenas
  // executar a rota, igual segue abaixo:
  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
});

export { categoriesRoutes };
