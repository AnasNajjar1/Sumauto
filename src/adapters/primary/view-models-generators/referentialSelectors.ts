import { VehicleElement } from '../../../hexagon/interfaces';

import { AppState, TActionStatus } from '../../../redux/appState';

export interface ListVm<T> {
    data: T[];
    status: TActionStatus;
}

export interface MakeListVm<T> {
    data: T[];
    preferred: T[];
    status: TActionStatus;
}

export type Selectors = {
    make: MakeListVm<VehicleElement>;
    model: ListVm<VehicleElement>;
    version: ListVm<VehicleElement>;
    year: ListVm<VehicleElement>;
    month: ListVm<VehicleElement>;
    fuel: ListVm<VehicleElement>;
    body: ListVm<VehicleElement>;
    door: ListVm<VehicleElement>;
    gear: ListVm<VehicleElement>;
    engine: ListVm<VehicleElement>;
};

export const getFormVehicleValue = (state: AppState): any => ({
    vehicle: state.form.vehicle,
});

export const getFormListSelector = (state: AppState): Selectors => ({
    make: state.referential.make,
    model: state.referential.model,
    version: state.referential.version,
    year: state.referential.year,
    month: state.referential.month,
    fuel: state.referential.fuel,
    body: state.referential.body,
    door: state.referential.door,
    gear: state.referential.gear,
    engine: state.referential.engine,
});
