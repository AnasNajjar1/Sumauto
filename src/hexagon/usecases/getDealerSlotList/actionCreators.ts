import { ActionsUnion, createAction } from '../../../redux/customActions';
import { Slot } from '../../interfaces';

export const Actions = {
    dealerSlotListFetching: () => createAction('dealerSlotList/FETCHING'),
    dealerSlotListFailed: () => createAction('dealerSlotList/FAILED'),
    dealerSlotListRetrieved: (dealerSlotList: Slot[]) =>
        createAction('dealerSlotList/SUCCESS', { dealerSlotList }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
