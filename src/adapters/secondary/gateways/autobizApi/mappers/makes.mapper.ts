import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { Makes } from '../../../../../hexagon/interfaces';
import { MakesDto } from '../dtos/makesDto';

export class MakesMapper implements Mapper<Makes> {
    static toDto(makesDto: MakesDto): Makes {
        makesDto.all = [...makesDto.preferred, ...makesDto.others];
        return makesDto;
    }
}
