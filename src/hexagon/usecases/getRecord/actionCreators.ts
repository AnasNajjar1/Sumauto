import { ActionsUnion, createAction } from '../../../redux/customActions';
import { TRecord } from '../../interfaces';

export const Actions = {
    recordFetching: () => createAction('record/PENDING'),
    recordFailed: () => createAction('record/FAILED'),
    recordRetrieved: (record: TRecord) => createAction('record/SUCCESS', { record }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
