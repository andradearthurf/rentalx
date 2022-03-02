// Os controllers servem para abstrair e remover a responsabilidade das rotas.
// Dessa forma, uma rota não precisa mais conter todo aquele código

import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    // Não temos um modelo definido de quais parâmetros realmente fazem parte das
    // categories, por isso inserimos tipagem para as categories.
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    // A rota agora foi minimizada, fazendo com que a responsabilidade dela seja apenas
    // executar a rota, igual segue abaixo:

    await createCategoryUseCase.execute({ name, description });
    return response.status(201).send();
  }
}

export { CreateCategoryController };
