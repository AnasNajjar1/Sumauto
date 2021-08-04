import { AppState } from '../../../redux/appState';

export const getErrorSelector = (state: AppState) => ({
    show: !!state.error.description,
    description: state.error.description,
});
