import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    checkZipcodePending: () => createAction('checkZipCode/PENDING'),
    checkZipcodeFailed: () => createAction('checkZipCode/FAILED'),
    checkZipcodeSucceed: () => createAction('checkZipCode/SUCCESS'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
