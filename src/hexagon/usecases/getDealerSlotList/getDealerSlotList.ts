import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { DealerGateway } from '../../gateways/dealerGateway.interface';
import * as actionCreators from './actionCreators';

export const getDealerSlotList =
    (dealerId: string): ThunkResult<void> =>
    async (dispatch, getState, { dealerGateway }: { dealerGateway: DealerGateway }) => {
        dispatch(actionCreators.Actions.dealerSlotListFetching());

        const result = await dealerGateway.requestDealerSlotList(dealerId);

        if (isRight(result)) {
            dispatch(actionCreators.Actions.dealerSlotListRetrieved(result.right));
        } else {
            dispatch(actionCreators.Actions.dealerSlotListFailed());
        }
    };
