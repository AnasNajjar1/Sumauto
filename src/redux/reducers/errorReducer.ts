import { AnyAction } from 'redux';
import { Error } from '../../hexagon/interfaces';

export const errorReducer = (state: Error = { description: undefined }, action: AnyAction) => {
    if (action.type === 'error/SHOW') {
        return {
            ...state,
            description: action.payload.description,
        };
    }
    if (action.type === 'error/HIDE') {
        return {
            ...state,
            description: null,
        };
    }
    return state;
};
