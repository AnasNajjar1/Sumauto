import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { ReferentialGateway } from '../../gateways/referentialGateway.interface';
import * as actionCreators from './actionCreators';

export const getMakeList =
    (): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { referentialGateway }: { referentialGateway: ReferentialGateway },
    ) => {
        dispatch(actionCreators.Actions.makeListFetching());
        const { identifier } = getState().client;

        const result = await referentialGateway.requestAllMakes(identifier);

        if (isRight(result)) {
            dispatch(actionCreators.Actions.makeListRetrieved(result.right.others));
            dispatch(actionCreators.Actions.makeListSetPreferred(result.right.preferred));
            // dispatch(actionCreators.Actions.makeListRetrieved(result.right));
        } else {
            dispatch(actionCreators.Actions.makeListFailed());
        }
    };
