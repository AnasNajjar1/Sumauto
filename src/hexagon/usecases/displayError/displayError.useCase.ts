import { ThunkResult } from '../../../redux/configureStore';
import * as actionCreators from './actionCreators';

export const dislayErrorUseCase =
    (description: string): ThunkResult<void> =>
    async (dispatch) => {
        dispatch(actionCreators.Actions.errorShow(description));
    };

export const hideErrorUseCase = (): ThunkResult<void> => async (dispatch) => {
    dispatch(actionCreators.Actions.errorHide());
};
