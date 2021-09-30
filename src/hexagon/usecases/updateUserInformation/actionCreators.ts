import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    UpdateUserInformationsPending: () => createAction('updateUserInformation/PENDING'),
    UpdateUserInformationsFailed: () => createAction('updateUserInformation/FAILED'),
    UpdateUserInformationsSucceed: () => createAction('updateUserInformation/SUCCESS'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
