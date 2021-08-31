import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { TrackerGateway } from '../../gateways/trackerGateway.interface';
import * as actionCreators from './actionCreators';

export const unsubscribeUseCase =
    (email: string, phone: string): ThunkResult<void> =>
    async (dispatch, getState, { trackerGateway }: { trackerGateway: TrackerGateway }) => {
        dispatch(actionCreators.Actions.unsubsribeFetching());
        const { config } = getState().client;

        const result = await trackerGateway.requestUnsubscribe({
            identifier: config.identifier,
            email,
            phone,
        });

        if (isRight(result)) {
            dispatch(actionCreators.Actions.unsubsribeRetrieved());
        } else {
            dispatch(actionCreators.Actions.unsubsribeFailed());
        }
    };
