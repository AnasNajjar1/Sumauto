import moment from 'moment';
import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { Slot } from '../../../../../hexagon/interfaces';
import { AutobizDealerSlotDto, AutobizDealerSlotHourDto } from '../dtos/dealerDto';
import { DealerSlotHourMapper } from './dealerSlotHour.mapper';

export class DealerSlotMapper implements Mapper<Slot> {
    static toApp(dto: AutobizDealerSlotDto): Slot {
        return {
            date: moment(dto.date).format('dddd l'),
            hours: dto.hours.map((h: AutobizDealerSlotHourDto) => DealerSlotHourMapper.toApp(h)),
        };
    }
}
