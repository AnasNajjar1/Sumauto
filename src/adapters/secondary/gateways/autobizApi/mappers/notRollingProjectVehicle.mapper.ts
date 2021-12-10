import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { AutobizNotRollingProjectDto } from '../dtos/notRollingProjectDto';

export class NotRollingProjectMapper implements Mapper<string> {
    static toAutobiz(identifier: string): AutobizNotRollingProjectDto {
        return {
            identifier,
        };
    }
}
