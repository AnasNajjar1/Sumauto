import { Dealer, Slot, TRecord } from '../../../hexagon/interfaces';

import { AppState, TActionStatus } from '../../../redux/appState';

export interface Vm<T> {
    data: T;
    status: TActionStatus;
}
export const getRecordSelector = (state: AppState): Vm<TRecord> => ({
    status: state.record.status,
    data: state.record.data,
});
