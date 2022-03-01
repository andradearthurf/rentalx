// Modelando nossa entidade, nossa tabela de categorias, passando que dados/
// atributos a entidade irá receber.
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
// Nosso model que agora se chama entities será a nossa entidade/tabela, que
// será a REFERÊNCIA para o nosso banco de dados.

// Decorators do nosso typeORM
@Entity("categories") // Definindo a referência que essa será uma tabela no banco de dados
class Category {
  // Nosso id é uma PK
  @PrimaryColumn()
  id?: string; // Passando como opcional para não erro na cateogires.routes.

  // Atributos
  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  // Método de instância da classe. Ele é chamado quando se instância uma classe.
  constructor() {
    // Se não tiver nenhum id
    if (!this.id) {
      // Com isso eu crio o id no método de instância inicial da classe, para não
      // precisar ficar criando toda hora a cada chamada de rota.
      this.id = uuidv4();
    }
  }
}

export { Category };
