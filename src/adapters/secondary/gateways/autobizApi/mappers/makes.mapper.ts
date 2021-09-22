import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { Makes } from '../../../../../hexagon/interfaces';
import { AutobizMakesDto } from '../dtos/makesDto';

export class MakesMapper implements Mapper<Makes> {
    static toApp(dto: AutobizMakesDto): Makes {
        dto.all = [...dto.preferred, ...dto.others];
        return dto;
    }
}
