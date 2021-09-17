import { AnyAction, combineReducers } from 'redux';
import produce from 'immer';
import { formListReducer } from './formListReducer';
import { FormValue, TReferentialItem } from '../../hexagon/interfaces';

export const filter = (state: FormValue = {}, action: AnyAction) => {
    if (action.type === 'filter/SET') {
        const { key, value } = action.payload.formValue;
        const nextState = produce(state, (draft) => {
            draft[key] = value;
        });

        return nextState;
    }

    return state;
};

export const cascade = (state: TReferentialItem[] = [], action: AnyAction) => {
    if (action.type === 'cascade/SET') {
        return action.payload.cascade;
    }
    return state;
};

export const referentialReducer = combineReducers({
    make: formListReducer('make'),
    model: formListReducer('model'),
    version: formListReducer('version'),
    year: formListReducer('year'),
    month: formListReducer('month'),
    fuel: formListReducer('fuel'),
    body: formListReducer('body'),
    door: formListReducer('door'),
    gear: formListReducer('gear'),
    engine: formListReducer('engine'),
    filter,
    cascade,
});
