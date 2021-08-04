import { AnyAction, combineReducers } from 'redux';
import { getClientConfig } from '../../config';
import { TClientConfig } from '../../hexagon/interfaces';
import { FetchStatus } from '../appState';

export const name = (state = '', action: AnyAction) => {
    if (action.type === 'client/SET_NAME') {
        return action.payload.name;
    }
    return state;
};

const clientConfigInitialState: TClientConfig = {
    identifier: '',
    displayRegistrationOption: false,
    registrationRegex: '',
    zipCodeRegex: '',
    phoneRegex: '',
    mileageMin: 0,
    mileageMax: 0,
    questionsGroup: [],
    required: [],
    cascadeOrder: [],
};

export const config = (state: TClientConfig = clientConfigInitialState, action: AnyAction) => {
    if (action.type === 'client/SET_CONFIG') return action.payload.config;
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
    name,
    config,
    recordId,
});
