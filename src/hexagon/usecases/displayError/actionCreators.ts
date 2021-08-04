import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    errorShow: (description: string) => createAction('error/SHOW', { description }),
    errorHide: () => createAction('error/HIDE'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
