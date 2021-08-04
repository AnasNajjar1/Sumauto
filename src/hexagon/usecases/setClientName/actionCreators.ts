import { ActionsUnion, createAction } from '../../../redux/customActions';
import { TClient } from '../../interfaces';

export const Actions = {
    setClientName: (name: TClient) => createAction('client/SET_NAME', { name }),
    setClientId: (identifier: string) => createAction('client/SET_IDENTIFIER', { identifier }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
