import { AppState, TActionStatus } from '../../../redux/appState';

export interface ListVm<T> {
    data: T[];
    status: TActionStatus;
}

export const getReferentialSelector = (state: AppState): any => ({
    referential: state.form.referential,
});

export const getFormSelector = (state: AppState): any => state.form;
