import { v4 as uuidv4 } from "uuid";

class Category {
  id?: string; // Passando como opcional para não erro na cateogires.routes.
  name: string;
  description: string;
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
