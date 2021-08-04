import { getClientConfig } from '../../../config';
import { ThunkResult } from '../../../redux/configureStore';
import { TClient } from '../../interfaces';
import * as actionCreators from './actionCreators';

export const setClientNameUseCase =
    (name: TClient): ThunkResult<void> =>
    async (dispatch) => {
        dispatch(actionCreators.Actions.setClientName(name));
        const { identifier } = getClientConfig(name);
        dispatch(actionCreators.Actions.setClientId(identifier));
    };
