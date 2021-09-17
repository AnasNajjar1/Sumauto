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

// ToDo : remove this

const sampleParticlure = {
    // phone: '911111111',
    // email: 'm.azzopardi@gmail.com',
    // mileage: '40000',
    // zipCode: '13001',
};

export const particular = (state: FormValue = sampleParticlure, action: AnyAction) => {
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
});
