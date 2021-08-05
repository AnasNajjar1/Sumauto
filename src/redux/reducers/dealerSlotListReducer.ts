import { AnyAction, combineReducers } from 'redux';
import { Slot } from '../../hexagon/interfaces';
import { TActionStatus } from '../appState';

export const data = (state: Slot[] = [], action: AnyAction) => {
    if (action.type === 'dealerSlotList/SUCCESS') return action.payload.dealerSlotList;
    return state;
};

export const status = (state: TActionStatus = 'idle', action: AnyAction) => {
    if (action.type === 'dealerSlotList/PENDING') return 'pending';
    if (action.type === 'dealerSlotList/SUCCESS') return 'succeeded';
    if (action.type === 'dealerSlotList/FAILED') return 'failed';
    return state;
};

export const dealerSlotListReducer = combineReducers({
    status,
    data,
});
