import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    recordFetching: () => createAction('record/duplicating/PENDING'),
    recordFailed: () => createAction('record/duplicating/FAILED'),
    recordRetrieved: (uid: string) => createAction('record/duplicating/SUCCESS', { uid }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
