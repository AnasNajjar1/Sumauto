import { AnyAction, combineReducers } from 'redux';
import { TActionStatus } from '../appState';

export const status = (state: TActionStatus = 'idle', action: AnyAction) => {
    if (action.type === 'notRolling/fetching/PENDING') return 'pending';
    if (action.type === 'notRolling/fetching/SUCCESS') return 'succeeded';
    if (action.type === 'notRolling/fetching/FAILED') return 'failed';
    return state;
};

export const notRollingReducer = combineReducers({
    status,
});
