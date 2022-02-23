import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const specificationAlreadyExisits =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExisits) {
      throw new Error("Specification already exists!");
    }

    const specification = { name, description };

    this.specificationsRepository.create(specification);
  }
}

export { CreateSpecificationService };
