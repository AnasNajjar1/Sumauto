import { ActionsUnion, createAction } from '../../../redux/customActions';
import { Dealer } from '../../interfaces';

export const Actions = {
    checkZipcodePending: () => createAction('checkZipCode/PENDING'),
    checkZipcodeFailed: () => createAction('checkZipCode/FAILED'),
    checkZipcodeSucceed: () => createAction('checkZipCode/SUCCESS'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
