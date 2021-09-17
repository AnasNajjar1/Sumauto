import { AnyAction } from 'redux';
import produce from 'immer';

type FormValue = {
    [key: string]: string;
};
// TODO DELETE ?
export const vehicleReducer = (state: FormValue = {}, action: AnyAction) => {
    if (action.type === 'form/vehicle/SET_VALUE') {
        const { key, value } = action.payload.formValue;
        const nextState = produce(state, (draft) => {
            draft[key] = value;
        });
        return nextState;
    }
    return state;
};
