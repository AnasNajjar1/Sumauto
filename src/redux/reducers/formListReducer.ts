import { AnyAction, combineReducers } from 'redux';
import { VehicleElement } from '../../hexagon/interfaces';
import { TActionStatus } from '../appState';

function createDataWithNamedType(dataName: string) {
    return function data(state: VehicleElement[] = [], action: AnyAction) {
        if (action.type === `${dataName}/SUCCESS`) return action.payload[dataName];
        return state;
    };
}

function createStatusWithNamedType(statusName: string) {
    return function status(state: TActionStatus = 'idle', action: AnyAction) {
        switch (action.type) {
            case `${statusName}/PENDING`:
                return 'pending';
            case `${statusName}/SUCCESS`:
                return 'succeeded';
            case `${statusName}/FAILED`:
                return 'failed';
            case `${statusName}/RESET`:
                return 'idle';
            default:
                return state;
        }
    };
}

export function formListReducer(reducerName: string) {
    return combineReducers({
        status: createStatusWithNamedType(reducerName),
        data: createDataWithNamedType(reducerName),
    });
}
