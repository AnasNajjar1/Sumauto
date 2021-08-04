import { AnyAction, combineReducers } from 'redux';
import { FetchStatus } from '../appState';

export const identifier = (state = '', action: AnyAction) => {
    if (action.type === 'client/SET_IDENTIFIER') {
        return action.payload.identifier;
    }
    return state;
};

export const recordId = (state = '', action: AnyAction) => {
    if (action.type === 'record/SAVED') {
        return action.payload.id;
    }
    return state;
};

export const status = (state: FetchStatus = 'idle', action: AnyAction) => {
    if (action.type === 'record/SAVING') return 'loading';
    if (action.type === 'record/SAVED') return 'succeeded';
    if (action.type === 'record/FAILED') return 'failed';
    return state;
};

export const clientReducer = combineReducers({
    status,
    identifier,
    recordId,
});
