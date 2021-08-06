import { TRecord } from '../../../hexagon/interfaces';

import { AppState, TActionStatus } from '../../../redux/appState';

export interface Vm<T> {
    data: T;
    status: TActionStatus;
    id: number;
}
export const getRecordSelector = (state: AppState): Vm<TRecord> => ({
    status: state.record.status,
    data: state.record.data,
    id: state.record.id,
});
