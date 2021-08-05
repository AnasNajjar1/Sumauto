import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    carDetailsLoading: () => createAction('carDetails/PENDING'),
    carDetailsFailed: () => createAction('carDetails/FAILED'),
    carDetailsRetrieved: () => createAction('carDetails/SUCCESS'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
