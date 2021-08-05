import { ActionsUnion, createAction } from '../../../redux/customActions';
import { Dealer } from '../../interfaces';

export const Actions = {
    dealerListFetching: () => createAction('dealerList/PENDING'),
    dealerListFailed: () => createAction('dealerList/FAILED'),
    dealerListRetrieved: (dealerList: Dealer[]) =>
        createAction('dealerList/SUCCESS', { dealerList }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
