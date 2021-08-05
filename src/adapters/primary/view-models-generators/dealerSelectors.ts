import { Dealer, Slot } from '../../../hexagon/interfaces';

import { AppState, TActionStatus } from '../../../redux/appState';

export interface ListVm<T> {
    data: T[];
    status: TActionStatus;
}
export const getDealerListSelector = (state: AppState): ListVm<Dealer> => ({
    status: state.dealer.dealerList.status,
    data: state.dealer.dealerList.data,
});

export const getDealerSlotListSelector = (state: AppState): ListVm<Slot> => ({
    status: state.dealer.dealerSlotList.status,
    data: state.dealer.dealerSlotList.data,
});
