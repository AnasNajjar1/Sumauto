import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { DealerGateway } from '../../gateways/dealerGateway.interface';
import * as actionCreators from './actionCreators';

export const getDealerListUseCase =
    (recordId: string): ThunkResult<void> =>
    async (dispatch, getState, { dealerGateway }: { dealerGateway: DealerGateway }) => {
        dispatch(actionCreators.Actions.dealerListFetching());
        const { config } = getState().client;
        const result = await dealerGateway.requestDealerList(config.identifier, recordId);

        if (isRight(result)) {
            dispatch(actionCreators.Actions.dealerListRetrieved(result.right));
        } else {
            dispatch(actionCreators.Actions.dealerListFailed());
        }
    };
