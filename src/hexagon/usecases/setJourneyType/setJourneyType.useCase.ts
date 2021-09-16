import { ThunkResult } from '../../../redux/configureStore';
import { TJourney } from '../../interfaces';
import * as actionCreators from './actionCreators';
import { ClientConfigGateway } from '../../gateways/clientConfigGateway.interface';

export const setJourneyTypeUseCase =
    (journeyType: TJourney): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { clientConfigGateway }: { clientConfigGateway: ClientConfigGateway },
    ) => {
        dispatch(actionCreators.Actions.setJourneyType(journeyType));
    };
