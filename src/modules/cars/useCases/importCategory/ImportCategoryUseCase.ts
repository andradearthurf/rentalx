import { parse } from "csv-parse";
import fs from "fs"; // Conceito de stream para a leitura dos nossos files.

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  // Função responsável por fazer a leitura do nosso arquivo de categorias
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    // Uma Promise pode ser criada quando define uma função como async, ou
    // utilizando o new Promise passando uma função como parâmetro.
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      // Fazendo a leitura do arquivo que foi importado
      const stream = fs.createReadStream(file.path);

      const parseFile = parse(); // Irá delimitar o ',' como cada tipo de dados.
      // por exemplo, o nome e a description de cada carro delimitado pela virgula.

      // A cada linha lida conseguiremos pegar a linha e dividir entre name e
      // description, por exemplo. O pipe pega o nosso stream (cada pedaço) e dentro dele,
      // ele joga para algum lugar que iremos determinar.
      stream.pipe(parseFile);

      // imprimir/ler o que está do nosso arquivo csv e repassar para o nosso
      // array de categories, as linhas que o arquivo possui.
      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
      /**
       * Agora sobre o método .on do parseFile. Esse método é para definir o que
       * deseja fazer em cada evento, então no evento de "data" (quando cada linha for lida)
       * faça algo. (função logo em seguida).Então no evento de "end" (quando a
       * leitura do arquivo tiver sido concluída), o que está sendo executado é a
       * resolução da Promise.Agora no evento de "error", está sendo feito a rejeição da Promise
       */
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
