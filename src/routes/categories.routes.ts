// Cada tabela da nossa aplicação terá um arquivo routes que representará sua devida rota
// Criaremos a rota para ai sim ser usada dentro do server.ts (com app.use())
import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository(); // Instanciando a classe, logo categoriesRepository terá todos os métodos da classe.

// Nossa categoria recebera um 'name' e um 'description'.
categoriesRoutes.post("/", (request, response) => {
  // Não temos um modelo definido de quais parâmetros realmente fazem parte das
  // categories, por isso inserimos tipagem para as categories.
  const { name, description } = request.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return response.status(400).json({ error: "Category Already exists!" });
  }

  const category = { name, description };

  categoriesRepository.create(category);

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
});

export { categoriesRoutes };
