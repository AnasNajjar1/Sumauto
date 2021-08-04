import { AnyAction, combineReducers } from 'redux';
import { VehicleElement } from '../../hexagon/interfaces';
import { FetchStatus } from '../appState';

export const data = (state: VehicleElement[] = [], action: AnyAction) => {
    if (action.type === 'make/SUCCESS') {
        return action.payload.makeList;
    }
    return state;
};

export const preferred = (state: VehicleElement[] = [], action: AnyAction) => {
    if (action.type === 'make/SET_PREFERRED') {
        return action.payload.preferredList;
    }
    return state;
};

export const status = (state: FetchStatus = 'idle', action: AnyAction) => {
    if (action.type === 'make/FETCHING') return 'loading';
    if (action.type === 'make/SUCCESS') return 'succeeded';
    if (action.type === 'make/FAILED') return 'failed';
    return state;
};

export const makeListReducer = combineReducers({
    status,
    data,
    preferred,
});
