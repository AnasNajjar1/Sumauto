import { ActionsUnion, createAction } from '../../../redux/customActions';
import { TRecord } from '../../interfaces';

export const Actions = {
    recordFetching: () => createAction('record/fetching/PENDING'),
    recordFailed: () => createAction('record/fetching/FAILED'),
    recordRetrieved: (record: TRecord) => createAction('record/fetching/SUCCESS', { record }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
