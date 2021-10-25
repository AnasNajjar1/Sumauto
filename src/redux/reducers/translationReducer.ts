import { AnyAction, combineReducers } from 'redux';
import { TActionStatus } from '../appState';

export const data = (state: any = {}, action: AnyAction) => {
    if (action.type === 'translation/SUCCESS') return action.payload.translation;
    return state;
};

export const status = (state: TActionStatus = 'idle', action: AnyAction) => {
    if (action.type === 'translation/PENDING') return 'pending';
    if (action.type === 'translation/SUCCESS') return 'succeeded';
    if (action.type === 'translation/FAILED') return 'failed';
    return state;
};

export const translationReducer = combineReducers({
    status,
    data,
});
