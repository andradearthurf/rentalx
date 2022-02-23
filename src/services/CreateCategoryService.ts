// As rotas estão com responsabilidades demais dentro delas, com isso iremos
// criar um novo SERVICE para que, por exemplo a rota post não fique responsável
// pela criação, desviando essa funcionalidade para o service.

import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

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
class CreateCategoryService {
  // Recebendo dentro do constructor do service o apontamento para o CategoriesRepository
  // para acessar as funções implementada la dentro, como create() e findByName().
  constructor(private categoriesRepository: ICategoriesRepository) {}

  // Vai fazer tudo que o create() vai fazer, aqui dentro e depois passamos para a rota.
  execute({ name, description }: IRequest): void {
    // Código que estava na rota post: --------------------------------
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      // O service não reconhece o response nem request, logo para gerar erro,
      // é feito da seguinte forma:
      throw new Error("Category already exists!");
    }

    const category = { name, description };

    this.categoriesRepository.create(category);
    // -----------------------------------------------------------------
  }
}

export { CreateCategoryService };
