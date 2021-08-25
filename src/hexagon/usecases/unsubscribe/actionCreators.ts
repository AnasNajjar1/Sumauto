import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    unsubsribeFetching: () => createAction('unsubscribe/PENDING'),
    unsubsribeFailed: () => createAction('unsubscribe/FAILED'),
    unsubsribeRetrieved: () => createAction('unsubscribe/SUCCESS'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
