import { AnyAction, combineReducers } from 'redux';
import { Dealer } from '../../hexagon/interfaces';
import { TActionStatus } from '../appState';

export const data = (state: Dealer[] = [], action: AnyAction) => {
    if (action.type === 'dealerList/SUCCESS') return action.payload.dealerList;
    return state;
};

export const status = (state: TActionStatus = 'idle', action: AnyAction) => {
    if (action.type === 'dealerList/PENDING') return 'pending';
    if (action.type === 'dealerList/SUCCESS') return 'succeeded';
    if (action.type === 'dealerList/FAILED') return 'failed';
    return state;
};

export const dealerListReducer = combineReducers({
    status,
    data,
});
