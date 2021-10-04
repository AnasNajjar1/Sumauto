import moment from 'moment';
import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { Hour } from '../../../../../hexagon/interfaces';
import { AutobizDealerSlotHourDto } from '../dtos/dealerDto';

export class DealerSlotHourMapper implements Mapper<Hour> {
    static toApp(dto: AutobizDealerSlotHourDto): Hour {
        return {
            id: dto.id,
            hour: moment(dto.hour, 'HH').format('HH:mm'),
            status: dto.status === 1 ? 'closed' : 'open',
        };
    }
}
