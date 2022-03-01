// Nossos repositórios serão responsáveis por fazer o acesso ao banco de dados, por fazer
// o cadastro, insert, select, toda a manipulação com nosso banco de dados!!!

// singleton - padrão de projeto

import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
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
  private repository: Repository<Category>; // O acesso ao Repository (classe do typeORM)
  // só poderá ser acessado aqui dentro da classe, por causa do private

  // Modelo SINGLETON:
  // eslint-disable-next-line no-use-before-define
  // private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category); // Criar o repositório, ou "pega-lo"
  }

  // Só vai criar a nova instância se ainda não houver instância, com isso, na
  // hora que for listar as categories, o array estará preenchido.
  // O getInstance vai ser responsável por instanciar nossa classe ao retornar
  // uma instância já existente.
  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }
  //   return CategoriesRepository.INSTANCE;
  // }

  // Vai ser responsável por cadastrar nossa categoria.
  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    // Precisamos criar essa entidade primeiro, com o método create() do typeORM
    // para conseguir salvar e passar para o banco de dados.
    const category = this.repository.create({
      description,
      name,
      // Agora quem cria o created_at é o nosso banco com "now()"
    });

    // Temos que usar o await para esperar que a linha de cima ocorra para finalizar
    // o nosso método
    await this.repository.save(category);
  }

  // Imprimindo as nossas categorias.
  async list(): Promise<Category[]> {
    const categories = await this.repository.find(); // esse find() do Repository retornará
    // para nós uma lista.
    return categories;
  }

  // Validando categorias, isto é, verificando se há uma categoria com o nome igual.
  async findByName(name: string): Promise<Category> {
    // Fazendo um find para buscar e retonar o objeto, verificando se há uma categoria
    // com o nome já existente
    // Fazendo um "WHERE":
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
