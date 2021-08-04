import { ActionsUnion, createAction } from '../../../redux/customActions';
import { CarDetails } from '../../interfaces';

export const Actions = {
    carDetailsFetching: () => createAction('carDetails/FETCHING'),
    carDetailsFailed: () => createAction('carDetails/FAILED'),
    carDetailsRetrieved: () => createAction('carDetails/SUCCESS'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
