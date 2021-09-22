import { AppState } from '../../../redux/appState';

export const getCheckZipCodeSelector = (state: AppState) => ({
    checkZipCode: state.form.checkZipCode,
});
