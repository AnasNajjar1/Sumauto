import { AppState, TActionStatus } from '../../../redux/appState';

export interface Vm {
    status: TActionStatus;
}

export const getUnsubscribeSelector = (state: AppState): Vm => ({
    status: state.unsubscribe.status,
});
