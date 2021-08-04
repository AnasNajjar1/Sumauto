import { ActionsUnion, createAction } from '../../../redux/customActions';
import { TClient, TClientConfig } from '../../interfaces';

export const Actions = {
    setClientName: (name: TClient) => createAction('client/SET_NAME', { name }),
    setClientConfig: (config: TClientConfig) => createAction('client/SET_CONFIG', { config }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
