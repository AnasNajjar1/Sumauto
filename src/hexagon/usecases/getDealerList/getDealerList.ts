import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { DealerGateway } from '../../gateways/dealerGateway.interface';
import * as actionCreators from './actionCreators';

export const getDealerList =
    (zipcode: string): ThunkResult<void> =>
    async (dispatch, getState, { dealerGateway }: { dealerGateway: DealerGateway }) => {
        dispatch(actionCreators.Actions.dealerListFetching());

        const result = await dealerGateway.requestDealerList(zipcode);

        if (isRight(result)) {
            dispatch(actionCreators.Actions.dealerListRetrieved(result.right));
        } else {
            dispatch(actionCreators.Actions.dealerListFailed());
        }
    };
