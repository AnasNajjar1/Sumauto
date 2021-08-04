import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    setClientId: (identifier: string) => createAction('client/SET_IDENTIFIER', { identifier }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
