import { AnyAction, combineReducers } from 'redux';
import { TActionStatus } from '../appState';

export const status = (state: TActionStatus = 'idle', action: AnyAction) => {
    if (action.type === 'carDetails/PENDING') return 'pending';
    if (action.type === 'carDetails/SUCCESS') return 'succeeded';
    if (action.type === 'carDetails/FAILED') return 'failed';
    return state;
};

export const carDetailsReducer = combineReducers({
    status,
});
