import { ThunkResult } from '../../../redux/configureStore';
import * as actionCreators from './actionCreators';

export const setClientIdentifierUseCase =
    (identifier: string): ThunkResult<void> =>
    async (dispatch) => {
        dispatch(actionCreators.Actions.setClientId(identifier));
    };
