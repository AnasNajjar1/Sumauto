import { combineReducers } from 'redux';
import { dealerListReducer } from './dealerListReducer';
import { dealerSlotListReducer } from './dealerSlotListReducer';

export const dealerReducer = combineReducers({
    dealerList: dealerListReducer,
    dealerSlotList: dealerSlotListReducer,
});
