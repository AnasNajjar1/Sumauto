import { combineReducers } from 'redux';
import { makeListReducer } from './makeListReducer';
import { formListReducer } from './formListReducer';
import { carDetailsReducer } from './carDetailsReducer';

export const referentialReducer = combineReducers({
    make: makeListReducer,
    model: formListReducer('model'),
    version: formListReducer('version'),
    month: formListReducer('month'),
    year: formListReducer('year'),
    fuel: formListReducer('fuel'),
    body: formListReducer('body'),
    door: formListReducer('door'),
    gear: formListReducer('gear'),
    engine: formListReducer('engine'),
    carDetails: carDetailsReducer,
});
