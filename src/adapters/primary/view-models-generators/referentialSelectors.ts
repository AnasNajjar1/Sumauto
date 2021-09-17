import { VehicleElement } from '../../../hexagon/interfaces';

import { AppState, TActionStatus } from '../../../redux/appState';

export interface ListVm<T> {
    data: T[];
    status: TActionStatus;
}

export const getMakeListSelector = (state: AppState): ListVm<VehicleElement> => ({
    status: state.referential.make.status,
    data: state.referential.make.data,
});

export const getModelListSelector = (state: AppState): ListVm<VehicleElement> => ({
    status: state.referential.model.status,
    data: state.referential.model.data,
});

export const getBodyListSelector = (state: AppState): ListVm<VehicleElement> => ({
    status: state.referential.body.status,
    data: state.referential.body.data,
});

export const getFuelListSelector = (state: AppState): ListVm<VehicleElement> => ({
    status: state.referential.fuel.status,
    data: state.referential.fuel.data,
});

export const getYearListSelector = (state: AppState): ListVm<VehicleElement> => ({
    status: state.referential.year.status,
    data: state.referential.year.data,
});

export const getMonthListSelector = (state: AppState): ListVm<VehicleElement> => ({
    status: state.referential.month.status,
    data: state.referential.month.data,
});

export const getVersionListSelector = (state: AppState): ListVm<VehicleElement> => ({
    status: state.referential.version.status,
    data: state.referential.version.data,
});

export const getReferentialSelector = (state: AppState): any => ({
    referential: state.referential,
});

export const getFilter = (state: AppState): any => ({
    filter: state.referential.filter,
});
