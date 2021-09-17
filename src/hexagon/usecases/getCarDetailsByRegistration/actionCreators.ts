import { ActionsUnion, createAction } from '../../../redux/customActions';
import { FormValue } from '../../interfaces';

export const Actions = {
    carDetailsLoading: () => createAction('carDetails/PENDING'),
    carDetailsFailed: () => createAction('carDetails/FAILED'),
    carDetailsRetrieved: () => createAction('carDetails/SUCCESS'),
    setVehicleAll: (formValue: FormValue) => createAction('vehicle/SETALL', { formValue }),
    setVehicleNames: (formValue: FormValue) => createAction('vehicle/SETNAMES', { formValue }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
