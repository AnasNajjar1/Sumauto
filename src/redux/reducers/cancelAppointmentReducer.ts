import { AnyAction, combineReducers } from 'redux';
import { TActionStatus } from '../appState';

export const status = (state: TActionStatus = 'idle', action: AnyAction) => {
    if (action.type === 'cancelAppointment/PENDING') return 'pending';
    if (action.type === 'cancelAppointment/SUCCESS') return 'succeeded';
    if (action.type === 'cancelAppointment/FAILED') return 'failed';
    return state;
};

export const cancelAppointmentReducer = combineReducers({
    status,
});
