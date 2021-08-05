import { AppState, TActionStatus } from '../../../redux/appState';

export type Selectors = {
    status: TActionStatus;
};

export const getRegistrationSelector = (state: AppState): Selectors => ({
    status: state.referential.carDetails.status,
});
