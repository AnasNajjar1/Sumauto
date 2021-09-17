import { AppState } from '../../../redux/appState';

export const getClientSelector = (state: AppState) => ({
    client: state.client,
    config: state.client.config,
});
