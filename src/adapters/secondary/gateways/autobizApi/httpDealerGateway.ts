import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import { Dealer, Slot } from '../../../../hexagon/interfaces';
import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { DealerGateway } from '../../../../hexagon/gateways/dealerGateway.interface';
import { DealerMapper } from './mappers/dealer.mapper';
import { AutobizDealerDto, AutobizDealerSlotDto } from './dtos/dealerDto';
import { DealerSlotMapper } from './mappers/dealerSlot.mapper';

export class HttpDealerGateway extends BaseApi implements DealerGateway {
    async requestDealerList(identifier: string, recordUid: string): Promise<ApiResponse<Dealer[]>> {
        try {
            const response = await this.get(
                `/record/${recordUid}/networks?identifier=${identifier}`,
            );
            const dealers = response.data.map((p: AutobizDealerDto) => DealerMapper.toApp(p));
            return right(dealers);
        } catch (error) {
            return left(error as string);
        }
    }

    async requestDealerSlotList(
        identifier: string,
        recordUid: string,
        dealerId: string,
    ): Promise<ApiResponse<Slot[]>> {
        try {
            const response = await this.get(
                `/record/${recordUid}/network/${dealerId}/slots?identifier=${identifier}`,
            );

            const slots = response.data.slots.map((p: AutobizDealerSlotDto) =>
                DealerSlotMapper.toApp(p),
            );

            return right(slots);
        } catch (error) {
            return left(error as string);
        }
    }
}
