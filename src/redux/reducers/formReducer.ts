import { combineReducers } from 'redux';
import { vehicleReducer } from './vehicleReducer';

export const formReducer = combineReducers({
    vehicle: vehicleReducer,
});
