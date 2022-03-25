/**
 * Vamos precisar adicionar a coluna avatar na tabela de users
 * Refatorar o usuário com coluna avatar
 * Configuração upload no multer
 * Criar a regra de negócio do upload
 * Criar nosso controller
 */

import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  // Essa rota só será acessada se o usuário estiver autenticado, logo vamos utilizar
  // o middleware de rota 'ensureAuthenticated.ts'. Logo esse middleware já verifica
  // se o usuário já existe, então não precisamos verificar novamente.
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`); // remover o avatar
    }

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
