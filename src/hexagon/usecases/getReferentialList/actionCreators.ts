import { ActionsUnion, createAction } from '../../../redux/customActions';
import { TReferentialItem, TRefrentialElement } from '../../interfaces';

export const Actions = {
    listFetching: (scope: TReferentialItem) => createAction(`${scope}/LOADING`),
    listFailed: (scope: TReferentialItem) => createAction(`${scope}/FAILED`),
    listRetrieved: (scope: TReferentialItem, list: TRefrentialElement[]) =>
        createAction(`${scope}/SUCCESS`, { list }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
