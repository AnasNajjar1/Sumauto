import moment from 'moment';
import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { AutobizCarDetailsDto } from '../dtos/carDetailsDto';
import { CarDetails } from '../../../../../hexagon/interfaces';

export class CarDetailsMapper implements Mapper<CarDetails> {
    static toApp(carDetailsDto: AutobizCarDetailsDto): CarDetails {
        const year = moment(carDetailsDto.regDate, 'YYYY-MM-DD').toDate().getFullYear().toString();
        const month = moment(carDetailsDto.regDate, 'YYYY-MM-DD').toDate().getMonth().toString();
        const monthName = moment(carDetailsDto.regDate, 'YYYY-MM-DD')
            .format('MMMM')
            .toString()
            .toUpperCase();

        return {
            make: carDetailsDto.brandId.toString(),
            makeName: carDetailsDto.brandLabel,
            model: carDetailsDto.modelId.toString(),
            modelName: carDetailsDto.modelLabel,
            body: carDetailsDto.bodyId.toString(),
            bodyName: carDetailsDto.bodyLabel,
            fuel: carDetailsDto.fuelId.toString(),
            fuelName: carDetailsDto.fuelLabel,
            door: carDetailsDto.door.toString(),
            gear: carDetailsDto.gearId.toString(),
            gearName: carDetailsDto.gearLabel,
            engine: carDetailsDto.ps.toString(),
            month,
            monthName,
            year,
        };
    }
}
