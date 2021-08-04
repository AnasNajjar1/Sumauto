import { AnyAction, combineReducers } from 'redux';
import { Dealer } from '../../hexagon/interfaces';
import { FetchStatus } from '../appState';

export const data = (state: Dealer[] = [], action: AnyAction) => {
    if (action.type === 'dealerList/SUCCESS') return action.payload.dealerList;
    return state;
};

export const status = (state: FetchStatus = 'idle', action: AnyAction) => {
    if (action.type === 'dealerList/FETCHING') return 'loading';
    if (action.type === 'dealerList/SUCCESS') return 'succeeded';
    if (action.type === 'dealerList/FAILED') return 'failed';
    return state;
};

export const dealerListReducer = combineReducers({
    status,
    data,
});
