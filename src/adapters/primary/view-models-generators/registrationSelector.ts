import { AppState, TActionStatus } from '../../../redux/appState';

export type Selectors = {
    status: TActionStatus;
    // data: any;
};

export const getRegistrationSelector = (state: AppState): Selectors => ({
    status: state.carDetails.status,
    // data: state.carDetails.data,
});
