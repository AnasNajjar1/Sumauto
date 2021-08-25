import { AnyAction, combineReducers } from 'redux';
import { TActionStatus } from '../appState';

export const status = (state: TActionStatus = 'idle', action: AnyAction) => {
    if (action.type === 'unsubscribe/PENDING') return 'pending';
    if (action.type === 'unsubscribe/SUCCESS') return 'succeeded';
    if (action.type === 'unsubscribe/FAILED') return 'failed';
    return state;
};

export const unsubscribeReducer = combineReducers({
    status,
});
