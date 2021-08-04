import { AppState, FetchStatus } from '../../../redux/appState';

export type Selectors = {
    status: FetchStatus;
};

export const getRegistrationSelector = (state: AppState): Selectors => ({
    status: state.referential.carDetails.status,
});
