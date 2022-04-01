import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
// import { AppError } from "@shared/errors/AppError";
// import { deleteFile } from "@utils/file";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    // const car = await this.carsImagesRepository.findById(car_id);

    // if (!car) {
    //   throw new AppError("Car not found!");
    // }

    // if (car.image_name) {
    //   await deleteFile(`./tmp/cars/${car.image_name}`);
    // }

    // percorrendo o array com os paths das imagens e salvando no nosso BD
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
