import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { Dealer, Slot, Slots } from '../../../../../hexagon/interfaces';
import { AutobizDealerDto } from '../dtos/dealerDto';
import { AutobizSlotsDto } from '../dtos/SlotDto';

export class SlotsMapper implements Mapper<Slots> {
    // static toApp(dto: AutobizSlotsDto): Slots {
    //     return {
    //         slots: dto.slots,
    //     };
    // }
}
