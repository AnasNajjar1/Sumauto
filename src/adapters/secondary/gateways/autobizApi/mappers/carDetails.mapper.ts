import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { CarDetailsDto } from '../dtos/carDetailsDto';
import { CarDetails } from '../../../../../hexagon/interfaces';

export class CarDetailsMapper implements Mapper<CarDetails> {
    static toDto(carDetailsDto: CarDetailsDto): CarDetails {
        return {
            status: carDetailsDto.status,
            makeId: carDetailsDto.makeId.toString(),
            modelId: carDetailsDto.modelId.toString(),
            bodyId: carDetailsDto.bodyId.toString(),
            fuelId: carDetailsDto.fuelId.toString(),
            doors: carDetailsDto.doors.toString(),
            gearboxId: carDetailsDto.gearboxId.toString(),
            engine: carDetailsDto.engine.toString(),
            month: Number(carDetailsDto.dateRelease.substring(5, 7)).toString(),
            year: carDetailsDto.dateRelease.substring(0, 4),
        };
    }
}
