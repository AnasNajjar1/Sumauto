import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    recordReseting: () => createAction('record/RESET'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
