import { AppState } from '../../../redux/appState';

export const getNotRollingSelector = (state: AppState) => ({
    status: state.notRolling.status,
});
