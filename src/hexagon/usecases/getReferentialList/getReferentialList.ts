import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { ReferentialGateway } from '../../gateways/referentialGateway.interface';
import { TReferentialItem } from '../../interfaces';
import * as actionCreators from './actionCreators';

export const getReferentialList =
    (scope: TReferentialItem): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { referentialGateway }: { referentialGateway: ReferentialGateway },
    ) => {
        dispatch(actionCreators.Actions.listFetching(scope));

        const { config } = getState().client;
        const result = await referentialGateway.requestList(config.identifier, scope);

        if (isRight(result)) {
            dispatch(actionCreators.Actions.listRetrieved(scope, result.right));
        } else {
            dispatch(actionCreators.Actions.listFailed(scope));
        }
    };
