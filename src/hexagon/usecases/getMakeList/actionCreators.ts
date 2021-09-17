import { ActionsUnion, createAction } from '../../../redux/customActions';
import { TRefrentialElement } from '../../interfaces';

export const Actions = {
    makeListFetching: () => createAction('make/PENDING'),
    makeListFailed: () => createAction('make/FAILED'),
    makeListRetrieved: (makeList: TRefrentialElement[]) =>
        createAction('make/SUCCESS', { makeList }),
    // ??
    makeListSetPreferred: (preferredList: TRefrentialElement[]) =>
        createAction('make/SET_PREFERRED', { preferredList }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
