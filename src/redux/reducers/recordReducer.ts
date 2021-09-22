import { AnyAction, combineReducers } from 'redux';
import { TRecord } from '../../hexagon/interfaces';
import { TActionStatus } from '../appState';

export const data = (state: TRecord = {} as TRecord, action: AnyAction) => {
    if (action.type === 'record/fetching/SUCCESS') return action.payload.record;
    if (action.type === 'record/RESET') return {};
    return state;
};

export const id = (state = 0, action: AnyAction) => {
    if (action.type === 'record/fetching/SUCCESS') return action.payload.record.id;
    if (action.type === 'record/saving/SUCCESS') return action.payload.id;
    if (action.type === 'record/duplicating/SUCCESS') return action.payload.id;
    if (action.type === 'record/RESET') return 0;
    return state;
};

export const status = (state: TActionStatus = 'idle', action: AnyAction) => {
    if (action.type === 'record/fetching/PENDING') return 'pending';
    if (action.type === 'record/fetching/SUCCESS') return 'succeeded';
    if (action.type === 'record/fetching/FAILED') return 'failed';

    if (action.type === 'record/saving/PENDING') return 'pending';
    if (action.type === 'record/saving/SUCCESS') return 'succeeded';
    if (action.type === 'record/saving/FAILED') return 'failed';

    if (action.type === 'record/RESET') return 'idle';
    return state;
};

export const recordReducer = combineReducers({
    status,
    data,
    id,
});
