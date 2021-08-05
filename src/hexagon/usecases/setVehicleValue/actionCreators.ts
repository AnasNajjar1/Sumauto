import { ActionsUnion, createAction } from '../../../redux/customActions';
import { FormValue, VehicleElement } from '../../interfaces';

export const Actions = {
    vehicleValueSet: (formValue: FormValue) =>
        createAction('form/vehicle/SET_VALUE', { formValue }),

    listFetching: (listName?: string) => createAction(`${listName}/PENDING`),
    listFailed: (listName?: string) => createAction(`${listName}/FAILED`),
    listReset: (listName?: string) => createAction(`${listName}/RESET`),
    listRetrieved: (listName: string, list: VehicleElement[]) =>
        createAction(`${listName}/SUCCESS`, { [listName]: list }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
