import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    checkFormValidFailed: () => createAction('checkFormValid/FAILED'),
    checkFormValidSucceed: () => createAction('checkFormValid/SUCCESS'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
