import { ThunkResult } from '../../../redux/configureStore';
import { ReferentialGateway } from '../../gateways/referentialGateway.interface';
import { TVehicleStateItem } from '../../interfaces';
import * as actionCreators from './actionCreators';

const { Actions } = actionCreators;

export const setVehicleStateValue =
    (key: TVehicleStateItem, value: string): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { referentialGateway }: { referentialGateway: ReferentialGateway },
    ) => {
        dispatch(Actions.setVehicleState({ key, value }));
    };
