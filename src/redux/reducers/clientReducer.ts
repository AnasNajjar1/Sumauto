import { AnyAction, combineReducers } from 'redux';
import { TClientConfig } from '../../hexagon/interfaces';

export const deviceType = (state = '', action: AnyAction) => {
    if (action.type === 'client/SET_DEVICE_TYPE') {
        return action.payload.deviceType;
    }
    return state;
};

export const name = (state = '', action: AnyAction) => {
    if (action.type === 'client/SET_NAME') {
        return action.payload.name;
    }
    return state;
};

export const journeyType = (state = '', action: AnyAction) => {
    if (action.type === 'client/SET_JOURNEY_TYPE') {
        return action.payload.journeyType;
    }
    return state;
};

const clientConfigInitialState = {} as TClientConfig;

export const config = (state: TClientConfig = clientConfigInitialState, action: AnyAction) => {
    if (action.type === 'client/SET_CONFIG') return action.payload.config;
    return state;
};

export const clientReducer = combineReducers({
    name,
    deviceType,
    journeyType,
    config,
});
