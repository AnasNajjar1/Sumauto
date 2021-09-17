import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { Dealer } from '../../../../../hexagon/interfaces';
import { AutobizDealerDto } from '../dtos/dealerDto';

export class DealerMapper implements Mapper<Dealer> {
    static toApp(autobizDealerDto: AutobizDealerDto): Dealer {
        return {
            id: autobizDealerDto.dealerId.toString(),
            name: autobizDealerDto.name,
            city: autobizDealerDto.city,
            address: autobizDealerDto.adress,
            distance: Number(autobizDealerDto.distance),
        };
    }
}
