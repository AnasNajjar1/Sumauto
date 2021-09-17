import { AnyAction, combineReducers } from 'redux';
import { TRefrentialElement } from '../../hexagon/interfaces';
import { TActionStatus } from '../appState';

function createDataWithNamedType(dataName: string) {
    return function data(state: TRefrentialElement[] = [], action: AnyAction) {
        if (action.type === `${dataName}/SUCCESS`) {
            // if (dataName === 'make') {
            //     return action.payload.list[0].others;
            // }

            return action.payload.list;
        }
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
