import { AnyAction, combineReducers } from 'redux';
import produce from 'immer';
import { formListReducer } from './formListReducer';
import { FormValue, TReferentialItem } from '../../hexagon/interfaces';

export const vehicle = (state: FormValue = {}, action: AnyAction) => {
    if (action.type === 'vehicle/SET') {
        const { key, value } = action.payload.formValue;
        const nextState = produce(state, (draft) => {
            draft[key] = value;
        });
        return nextState;
    }

    if (action.type === 'vehicle/SETALL') {
        return action.payload.formValue;
    }

    return state;
};

export const vehicleName = (state: FormValue = {}, action: AnyAction) => {
    if (action.type === 'vehicle/SETNAMES') {
        return action.payload.formValue;
    }

    return state;
};

export const vehicleState = (state: FormValue = {}, action: AnyAction) => {
    if (action.type === 'vehicleState/SET') {
        const { key, value } = action.payload.formValue;
        const nextState = produce(state, (draft) => {
            draft[key] = value;
        });
        return nextState;
    }
    return state;
};

export const particular = (state: FormValue = {}, action: AnyAction) => {
    if (action.type === 'particular/SET') {
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

export const checkZipCode = (state = false, action: AnyAction) => {
    if (action.type === 'checkZipCode/FAILED') {
        return false;
    }
    if (action.type === 'checkZipCode/SUCCESS') {
        return true;
    }
    return state;
};

export const checkFormValid = (state = false, action: AnyAction) => {
    if (action.type === 'checkFormValid/FAILED') {
        return false;
    }
    if (action.type === 'checkFormValid/SUCCESS') {
        return true;
    }
    return state;
};

const referential = combineReducers({
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
});

export const formReducer = combineReducers({
    referential,
    vehicle,
    vehicleName,
    vehicleState,
    particular,
    cascade,
    checkZipCode,
    checkFormValid,
});
