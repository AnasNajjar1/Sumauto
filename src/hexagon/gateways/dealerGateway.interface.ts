import { ApiResponse } from '../infra/ApiResponse';
import { Dealer, Slot } from '../interfaces';

export interface DealerGateway {
    requestDealerList(identifier: string, recordUid: string): Promise<ApiResponse<Dealer[]>>;
    requestDealerSlotList(
        identifier: string,
        recordUid: string,
        dealerId: string,
    ): Promise<ApiResponse<Slot[]>>;
}
