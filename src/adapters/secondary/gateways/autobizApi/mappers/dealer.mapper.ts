import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { Dealer } from '../../../../../hexagon/interfaces';
import { AutobizDealerDto } from '../dtos/dealerDto';

export class DealerMapper implements Mapper<Dealer> {
    static toApp(dto: AutobizDealerDto): Dealer {
        return {
            id: dto.networkId.toString(),
            name: dto.name,
            city: dto.city,
            address: dto.adress,
            distance: Number(dto.distance),
        };
    }
}
