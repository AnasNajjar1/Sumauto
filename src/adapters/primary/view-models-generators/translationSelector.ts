import { AppState } from '../../../redux/appState';

export const getTranslationSelector = (state: AppState) => ({
    data: state.translation.data,
});
