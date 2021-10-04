import { ThunkResult } from '../../../redux/configureStore';
import * as actionCreators from './actionCreators';

export const checkFormValidUseCase =
    (valid: boolean): ThunkResult<void> =>
    async (dispatch) => {
        if (valid) {
            dispatch(actionCreators.Actions.checkFormValidSucceed());
        } else {
            dispatch(actionCreators.Actions.checkFormValidFailed());
        }
    };
