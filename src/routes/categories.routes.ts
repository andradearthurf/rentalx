// Cada tabela da nossa aplicação terá um arquivo routes que representará sua devida rota
// Criaremos a rota para ai sim ser usada dentro do server.ts (com app.use())
import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory/index";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoryController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

// Iremos armazenar em uma pasta temporária o arquivo do upload, e dps faz-se a
// deleção da pasta temporária.
const upload = multer({
  dest: "./tmp",
});

// const categoriesRepository = new CategoriesRepository(); // Instanciando a classe, logo categoriesRepository terá todos os métodos da classe.

// Nossa categoria recebera um 'name' e um 'description'.
categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoryController.handle(request, response);
});

// Upload de apenas 1 arquivo
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
