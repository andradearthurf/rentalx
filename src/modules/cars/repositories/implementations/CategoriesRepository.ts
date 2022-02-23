// Nossos repositórios serão responsáveis por fazer o acesso ao banco de dados, por fazer
// o cadastro, insert, select, toda a manipulação com nosso banco de dados!!!

// singleton - padrão de projeto
import { Category } from "../../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

// DTO - Data transfer object - Criar um objeto responsável pela transferência de dados
// pela uma classe e outra. De routes para repositories.

// Dou um implements para que no arquivo ICategoriesRepository, venha todas as
// informações dessa classe CategoriesRepository, quando eu passar um create(),
// por exemplo, dentro da interface.
class CategoriesRepository implements ICategoriesRepository {
  // Por enquanto a inserção será em um array.
  // Definindo como private, pois só quem vai ter acesso ao categories, será
  // o nosso repositório.
  private categories: Category[]; // Tipando o array.

  // Modelo SINGLETON:
  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = []; // Trazendo a responsabilidade de criação/inicialização do array,
    // quando criar uma nova instância para a classe, por isso está passando no constructor.
  }

  // Só vai criar a nova instância se ainda não houver instância, com isso, na
  // hora que for listar as categories, o array estará preenchido.
  // O getInstance vai ser responsável por instanciar nossa classe ao retornar
  // uma instância já existente.
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
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
