import { ThunkResult } from '../../../redux/configureStore';
import { TDeviceType } from '../../interfaces';
import * as actionCreators from './actionCreators';
import { ClientConfigGateway } from '../../gateways/clientConfigGateway.interface';

export const setClientDeviceTypeUseCase =
    (deviceType: TDeviceType): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { clientConfigGateway }: { clientConfigGateway: ClientConfigGateway },
    ) => {
        dispatch(actionCreators.Actions.setClientDeviceType(deviceType));

        // dispatch(actionCreators.Actions.setClientConfig(config));
    };
