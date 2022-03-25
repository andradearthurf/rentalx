// Classe de customização dos nossos erros, pois atualmente, nós estamos passando
// apenas erro 500 para os nossos responses de exceções

export class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  // default de status 400
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
