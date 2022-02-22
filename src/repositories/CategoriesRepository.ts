// Nossos repositórios serão responsáveis por fazer o acesso ao banco de dados, por fazer
// o cadastro, insert, select, toda a manipulação com nosso banco de dados!!!

import { Category } from "../model/Category";

// DTO - Data transfer object - Criar um objeto responsável pela transferência de dados
// pela uma classe e outra. De routes para repositories.

// Criar uma interface para tipar o name e description e passar para o nosso método create().
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  // Por enquanto a inserção será em um array.
  // Definindo como private, pois só quem vai ter acesso ao categories, será
  // o nosso repositório.
  private categories: Category[]; // Tipando o array.

  constructor() {
    this.categories = []; // Trazendo a responsabilidade de criação/inicialização do array,
    // quando criar uma nova instância para a classe, por isso está passando no constructor.
  }

  // Vai ser responsável por cadastrar nossa categoria.
  create({ description, name }: ICreateCategoryDTO) {
    // A rota post não deve ter como base a criação do id, se não o id sempre vai ser criado
    // novamente, e desnecessariamente.
    // Criando uma nova instância de classe, para que o id seja criado e
    // passado para dentro do array.
    const category = new Category(); // Instanciando o objeto category para passar ele dentro do array

    // Criando todos os atributos de uma forma simplificada, ao invés de fazer:
    // category.name = name; category.description = description; etc.
    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category); // INSERINDO dentro do array.
  }

  // Imprimindo as nossas categorias.
  list(): Category[] {
    return this.categories;
  }

  // Validando categorias, isto é, verificando se há uma categoria com o nome igual.
  findByName(name: string): Category {
    // Fazendo um find para buscar e retonar o objeto, verificando se há uma categoria
    // com o nome já existente
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepository };
