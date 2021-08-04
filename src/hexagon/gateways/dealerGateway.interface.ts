import { ApiResponse } from '../infra/ApiResponse';
import { Dealer, Slot } from '../interfaces';

export interface DealerGateway {
    requestDealerList(zipcode: string): Promise<ApiResponse<Dealer[]>>;
    requestDealerSlotList(dealerId: string): Promise<ApiResponse<Slot[]>>;
    // saveAppointment(
    //     recordId: number,
    //     dealerId: number,
    //     day: string,
    //     hourStart: string,
    //     hourEnd: string,
    // ): Promise<ApiResponse<{ id: number }>>;
}
