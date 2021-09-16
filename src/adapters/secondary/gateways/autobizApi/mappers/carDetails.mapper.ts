import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { CarDetailsDto } from '../dtos/carDetailsDto';
import { CarDetails } from '../../../../../hexagon/interfaces';

export class CarDetailsMapper implements Mapper<CarDetails> {
    static toDto(carDetailsDto: CarDetailsDto): CarDetails {
        return {
            status: true,
            makeId: carDetailsDto.brandId.toString(),
            modelId: carDetailsDto.modelId.toString(),
            bodyId: carDetailsDto.bodyId.toString(),
            fuelId: carDetailsDto.fuelId.toString(),
            doors: carDetailsDto.door.toString(),
            gearboxId: carDetailsDto.gearId.toString(),
            engine: carDetailsDto.ps.toString(),
            month: Number(carDetailsDto.regDate.substring(5, 7)).toString(),
            year: carDetailsDto.regDate.substring(0, 4),
        };
    }
}
