import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    recordFetching: () => createAction('record/duplicating/PENDING'),
    recordFailed: () => createAction('record/duplicating/FAILED'),
    recordRetrieved: (id: string) => createAction('record/duplicating/SUCCESS', { id }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
