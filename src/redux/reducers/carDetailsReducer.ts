import { AnyAction, combineReducers } from 'redux';
import { FetchStatus } from '../appState';

export const status = (state: FetchStatus = 'idle', action: AnyAction) => {
    if (action.type === 'carDetails/FETCHING') return 'loading';
    if (action.type === 'carDetails/SUCCESS') return 'succeeded';
    if (action.type === 'carDetails/FAILED') return 'failed';
    return state;
};

export const carDetailsReducer = combineReducers({
    status,
});
