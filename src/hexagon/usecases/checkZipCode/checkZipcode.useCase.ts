import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import * as actionCreators from './actionCreators';

export const checkZipcodeUseCase =
    (zipCode: string): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.checkZipcodePending());
        const { config } = getState().client;
        const result = await recordGateway.checkZipCode(config.identifier, zipCode);

        if (isRight(result)) {
            dispatch(actionCreators.Actions.checkZipcodeSucceed());
        } else {
            dispatch(actionCreators.Actions.checkZipcodeFailed());
        }
    };
