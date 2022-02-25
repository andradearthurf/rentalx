interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO);
  findByName(name: string);
}

export { ISpecificationsRepository, ICreateSpecificationDTO };