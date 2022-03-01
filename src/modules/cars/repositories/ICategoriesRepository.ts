// Arquivo molde para criar mais repositórios do tipo category. Sub-tipo
// Como se fosse um contrato padrão, implementado para que nossa aplicação funcione
// em diversos bancos por exemplo, com a mesma estrutura.
import { Category } from "../entities/Category";

// Criar uma interface para tipar o name e description e passar para o nosso método create().
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
