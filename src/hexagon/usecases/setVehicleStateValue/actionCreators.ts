import { ActionsUnion, createAction } from '../../../redux/customActions';
import { FormValue } from '../../interfaces';

export const Actions = {
    setVehicleState: (formValue: FormValue) => createAction('vehicleState/SET', { formValue }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
