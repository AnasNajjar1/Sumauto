import moment from 'moment';
import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { Slot } from '../../../../../hexagon/interfaces';
import { AutobizDealerSlotDto, AutobizDealerSlotHourDto } from '../dtos/dealerDto';
import { DealerSlotHourMapper } from './dealerSlotHour.mapper';

export class DealerSlotMapper implements Mapper<Slot> {
    static toApp(dto: AutobizDealerSlotDto): Slot {
        let formattedDate = moment(dto.date).format('dddd, D [de] MMMM');
        formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1).toLowerCase();

        return {
            date: formattedDate,
            hours: dto.hours.map((h: AutobizDealerSlotHourDto) => DealerSlotHourMapper.toApp(h)),
        };
    }
}
