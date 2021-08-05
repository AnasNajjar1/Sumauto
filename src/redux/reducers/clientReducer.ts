import { AnyAction, combineReducers } from 'redux';
import { TClientConfig } from '../../hexagon/interfaces';
import { TActionStatus } from '../appState';

export const name = (state = '', action: AnyAction) => {
    if (action.type === 'client/SET_NAME') {
        return action.payload.name;
    }
    return state;
};

const clientConfigInitialState = {} as TClientConfig;

export const config = (state: TClientConfig = clientConfigInitialState, action: AnyAction) => {
    if (action.type === 'client/SET_CONFIG') return action.payload.config;
    return state;
};

export const recordId = (state = '', action: AnyAction) => {
    if (action.type === 'record/saving/SUCCESS') {
        return action.payload.id;
    }
    return state;
};

export const status = (state: TActionStatus = 'idle', action: AnyAction) => {
    if (action.type === 'record/saving/PENDING') return 'pending';
    if (action.type === 'record/saving/SUCCESS') return 'succeeded';
    if (action.type === 'record/saving/FAILED') return 'failed';
    return state;
};

export const clientReducer = combineReducers({
    status,
    name,
    config,
    recordId,
});
