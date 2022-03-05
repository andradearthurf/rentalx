import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

// Esse arquivo irá ser responsável por ser um middleware de autenticação de rotas,
// isto é, verificar se o usuário que está acessando nossa rota é um usuário autenticado.

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Bearer "nosso token que estamos passando" e essas informações vem do nosso header
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  // Se o nosso token está presente no header/existir, precisamos fazer a desestruturação dele:
  const [, token] = authHeader.split(" "); // ignorando a posição 0
  // agora precisamos verificar se é um token válido

  try {
    const { sub: user_id } = verify(
      token,
      "da996e79da8f5eddf8889b01974e1582"
    ) as IPayload; // o tipo do retorno do verify é do tipo IPaylod para pegar o sub(id do user)

    const usersRepository = new UsersRepository(); // instanciando a classe para usar os métodos
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
