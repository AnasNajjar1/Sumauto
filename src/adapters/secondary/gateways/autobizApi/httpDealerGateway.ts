import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import { Dealer, Slot } from '../../../../hexagon/interfaces';
import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { DealerGateway } from '../../../../hexagon/gateways/dealerGateway.interface';
import { DealerMapper } from './mappers/dealer.mapper';
import { AutobizDealerDto } from './dtos/dealerDto';

export class HttpDealerGateway extends BaseApi implements DealerGateway {
    async requestDealerList(identifier: string, recordId: string): Promise<ApiResponse<Dealer[]>> {
        try {
            const response = await this.get(
                `/appointments/networks/${recordId}?identifier=${identifier}`,
            );
            const dealers = response.data.map((p: AutobizDealerDto) => DealerMapper.toApp(p));
            return right(dealers);
        } catch (error) {
            return left(error as string);
        }
    }

    async requestDealerSlotList(
        identifier: string,
        recordId: string,
        dealerId: string,
    ): Promise<ApiResponse<Slot[]>> {
        try {
            const response = await this.get(
                `/appointments/networks/${recordId}/${dealerId}/slots?identifier=${identifier}`,
            );
            const { slots } = response.data;
            return right(slots);
        } catch (error) {
            return left(error as string);
        }
    }
}
