import { getClientConfig } from '../../../config';
import { ThunkResult } from '../../../redux/configureStore';
import { TClient } from '../../interfaces';
import * as actionCreators from './actionCreators';
import { ClientConfigGateway } from '../../gateways/clientConfigGateway.interface';

export const setClientNameUseCase =
    (name: TClient): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { clientConfigGateway }: { clientConfigGateway: ClientConfigGateway },
    ) => {
        dispatch(actionCreators.Actions.setClientName(name));
        const config = clientConfigGateway.getConfig(name);

        dispatch(actionCreators.Actions.setClientConfig(config));
    };
