import { AnyAction, combineReducers } from 'redux';
import { TRecord } from '../../hexagon/interfaces';
import { TActionStatus } from '../appState';

export const data = (state: TRecord = {} as TRecord, action: AnyAction) => {
    if (action.type === 'record/SUCCESS') return action.payload.record;
    return state;
};

export const status = (state: TActionStatus = 'idle', action: AnyAction) => {
    if (action.type === 'record/PENDING') return 'pending';
    if (action.type === 'record/SUCCESS') return 'succeeded';
    if (action.type === 'record/FAILED') return 'failed';
    return state;
};

export const recordReducer = combineReducers({
    status,
    data,
});
