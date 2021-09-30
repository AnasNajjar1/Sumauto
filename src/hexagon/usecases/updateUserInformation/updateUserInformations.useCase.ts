import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import * as actionCreators from './actionCreators';

export const updateUserInformationsUseCase =
    (recordId: string): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.UpdateUserInformationsPending());
        const { config } = getState().client;
        const { particular } = getState().form;
        const result = await recordGateway.updateUserInformation(
            config.identifier,
            Number(recordId),
            particular,
        );

        if (isRight(result)) {
            dispatch(actionCreators.Actions.UpdateUserInformationsSucceed());
        } else {
            dispatch(actionCreators.Actions.UpdateUserInformationsFailed());
        }
    };
