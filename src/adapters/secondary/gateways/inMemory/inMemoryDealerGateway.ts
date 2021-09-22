/*eslint-disable */
import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import { Dealer, Slot } from '../../../../hexagon/interfaces';
import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { DealerGateway } from '../../../../hexagon/gateways/dealerGateway.interface';

export class InMemoryDealerGateway extends BaseApi implements DealerGateway {
    private dealerList = [] as Dealer[];

    private dealerSlotList = [] as Slot[];

    async requestDealerList(identifier: string, recordId: string): Promise<ApiResponse<Dealer[]>> {
        try {
            const result = this.dealerList;
            return right(result);
        } catch (error) {
            return left(error as string);
        }
    }

    feedDealerListWith(dealers: Dealer[]) {
        this.dealerList = dealers;
    }

    async requestDealerSlotList(dealerId: string): Promise<ApiResponse<Slot[]>> {
        try {
            const result = this.dealerSlotList;
            
            return right(result);
        } catch (error) {
            return left(error as string);
        }
    }

    feedDealerSlotListWith(slots: Slot[]) {
        this.dealerSlotList = slots;
    }
}
