import { ThunkResult } from '../../../redux/configureStore';
import { ReferentialGateway } from '../../gateways/referentialGateway.interface';
import { TParticularItem } from '../../interfaces';
import * as actionCreators from './actionCreators';

const { Actions } = actionCreators;

export const setParticularValue =
    (key: TParticularItem, value: string): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { referentialGateway }: { referentialGateway: ReferentialGateway },
    ) => {
        dispatch(Actions.setParticular({ key, value }));
    };
