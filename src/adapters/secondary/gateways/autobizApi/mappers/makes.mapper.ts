import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { Makes } from '../../../../../hexagon/interfaces';
import { AutobizMakesDto } from '../dtos/makesDto';

export class MakesMapper implements Mapper<Makes> {
    static toApp(makesDto: AutobizMakesDto): Makes {
        makesDto.all = [...makesDto.preferred, ...makesDto.others];
        return makesDto;
    }
}
