import { ActionsUnion, createAction } from '../../../redux/customActions';
import { FormValue, TReferentialItem, TRefrentialElement } from '../../interfaces';

export const Actions = {
    setFilter: (formValue: FormValue) => createAction('filter/SET', { formValue }),

    setCascade: (cascade: TReferentialItem[]) => createAction('cascade/SET', { cascade }),

    listReset: (scope: TReferentialItem) => createAction(`${scope}/RESET`),
    listFetching: (scope: TReferentialItem) => createAction(`${scope}/LOADING`),
    listFailed: (scope: TReferentialItem) => createAction(`${scope}/FAILED`),
    listRetrieved: (scope: TReferentialItem, list: TRefrentialElement[]) =>
        createAction(`${scope}/SUCCESS`, { list }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
