import { AnyAction, combineReducers } from 'redux';
import { Dealer } from '../../hexagon/interfaces';
import { FetchStatus } from '../appState';

export const data = (state: Dealer[] = [], action: AnyAction) => {
    if (action.type === 'record/SUCCESS') return action.payload.record;
    return state;
};

export const status = (state: FetchStatus = 'idle', action: AnyAction) => {
    if (action.type === 'record/FETCHING') return 'loading';
    if (action.type === 'record/SUCCESS') return 'succeeded';
    if (action.type === 'record/FAILED') return 'failed';
    return state;
};

export const recordReducer = combineReducers({
    status,
    data,
});
