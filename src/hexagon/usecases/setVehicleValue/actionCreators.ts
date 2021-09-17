import { ActionsUnion, createAction } from '../../../redux/customActions';
import { FormValue, TReferentialItem, TRefrentialElement } from '../../interfaces';

export const Actions = {
    setVehicle: (formValue: FormValue) => createAction('vehicle/SET', { formValue }),

    setCascade: (cascade: TReferentialItem[]) => createAction('cascade/SET', { cascade }),

    listReset: (scope: TReferentialItem) => createAction(`${scope}/RESET`),
    listFetching: (scope: TReferentialItem) => createAction(`${scope}/PENDING`),
    listFailed: (scope: TReferentialItem) => createAction(`${scope}/FAILED`),
    listRetrieved: (scope: TReferentialItem, list: TRefrentialElement[]) =>
        createAction(`${scope}/SUCCESS`, { list }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
