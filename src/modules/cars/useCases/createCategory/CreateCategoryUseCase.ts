// As rotas estão com responsabilidades demais dentro delas, com isso iremos
// criar um novo SERVICE/useCase para que, por exemplo a rota post não fique responsável
// pela criação, desviando essa funcionalidade para o service.

import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/** O que o service deve fazer:
 * - Definir o tipo de retorno
 * - Alterar o retorno de erro
 * - Acessar o repositório
 * - Retornar algo (se possível)
 */
@injectable()
class CreateCategoryUseCase {
  // Recebendo dentro do constructor do service o apontamento para o CategoriesRepository
  // para acessar as funções implementada la dentro, como create() e findByName().
  constructor(
    @inject("CategoriesRepository") // Injeção de dependência, e instância com o new(), já que o tsyringe já faz isso.
    private categoriesRepository: ICategoriesRepository
  ) {}

  // Vai fazer tudo que o create() vai fazer, aqui dentro e depois passamos para a rota.
  async execute({ name, description }: IRequest): Promise<void> {
    // Código que estava na rota post: --------------------------------
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      // O service não reconhece o response nem request, logo para gerar erro,
      // é feito da seguinte forma:
      throw new AppError("Category already exists!");
    }

    const category = { name, description };

    this.categoriesRepository.create(category);
    // -----------------------------------------------------------------
  }
}

export { CreateCategoryUseCase };
