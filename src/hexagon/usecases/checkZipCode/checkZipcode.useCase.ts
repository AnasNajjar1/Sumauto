import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { ReferentialGateway } from '../../gateways/referentialGateway.interface';
import * as actionCreators from './actionCreators';

export const checkZipcodeUseCase =
    (zipCode: string): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { referentialGateway }: { referentialGateway: ReferentialGateway },
    ) => {
        dispatch(actionCreators.Actions.checkZipcodePending());
        const { config } = getState().client;
        const result = await referentialGateway.checkZipCode(config.identifier, zipCode);
        if (isRight(result)) {
            dispatch(actionCreators.Actions.checkZipcodeSucceed());
        } else {
            dispatch(actionCreators.Actions.checkZipcodeFailed());
        }
    };
