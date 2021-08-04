import { ThunkResult } from '../../../redux/configureStore';
import * as actionCreators from './actionCreators';

export const showError =
    (description: string): ThunkResult<void> =>
    async (dispatch) => {
        dispatch(actionCreators.Actions.errorShow(description));
    };

export const hideError = (): ThunkResult<void> => async (dispatch) => {
    dispatch(actionCreators.Actions.errorHide());
};
