import { ActionsUnion, createAction } from '../../../redux/customActions';
import { VehicleElement } from '../../interfaces';

export const Actions = {
    makeListFetching: () => createAction('make/FETCHING'),
    makeListFailed: () => createAction('make/FAILED'),
    makeListRetrieved: (makeList: VehicleElement[]) => createAction('make/SUCCESS', { makeList }),
    makeListSetPreferred: (preferredList: VehicleElement[]) =>
        createAction('make/SET_PREFERRED', { preferredList }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
