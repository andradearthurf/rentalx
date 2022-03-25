// Cada tabela da nossa aplicação terá um arquivo routes que representará sua devida rota
// Criaremos a rota para ai sim ser usada dentro do server.ts (com app.use())
import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

// Iremos armazenar em uma pasta temporária o arquivo do upload, e dps faz-se a
// deleção da pasta temporária.
const upload = multer({
  dest: "./tmp",
});

// Nosso controller agora irá funcionar exatamente como um middleware
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

// const categoriesRepository = new CategoriesRepository();
// Instanciando a classe, logo categoriesRepository terá todos os métodos da classe.

// Nossa categoria recebera um 'name' e um 'description'.
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

// Upload de apenas 1 arquivo
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
