import { ApiResponse } from '../infra/ApiResponse';
import { Dealer, Slot } from '../interfaces';

export interface DealerGateway {
    requestDealerList(identifier: string, recordId: string): Promise<ApiResponse<Dealer[]>>;
    requestDealerSlotList(
        identifier: string,
        recordId: string,
        dealerId: string,
    ): Promise<ApiResponse<Slot[]>>;
    // saveAppointment(
    //     recordId: number,
    //     dealerId: number,
    //     day: string,
    //     hourStart: string,
    //     hourEnd: string,
    // ): Promise<ApiResponse<{ id: number }>>;
}
