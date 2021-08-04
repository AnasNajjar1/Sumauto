import {
    Dealer,
    Error,
    FormVehicle,
    Makes,
    Slot,
    TClientConfig,
    VehicleElement,
} from '../hexagon/interfaces';

export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AppState {
    client: {
        name: string;
        recordId: string;
        status: FetchStatus;
        config: TClientConfig;
    };
    record: {
        id: number;
        status: FetchStatus;
        data: any;
    };
    referential: {
        carDetails: {
            status: FetchStatus;
        };
        make: {
            status: FetchStatus;
            data: VehicleElement[];
            preferred: VehicleElement[];
        };
        model: {
            status: FetchStatus;
            data: VehicleElement[];
        };
        version: {
            status: FetchStatus;
            data: VehicleElement[];
        };
        year: {
            status: FetchStatus;
            data: VehicleElement[];
        };
        month: {
            status: FetchStatus;
            data: VehicleElement[];
        };
        fuel: {
            status: FetchStatus;
            data: VehicleElement[];
        };
        body: {
            status: FetchStatus;
            data: VehicleElement[];
        };
        door: {
            status: FetchStatus;
            data: VehicleElement[];
        };
        gear: {
            status: FetchStatus;
            data: VehicleElement[];
        };
        engine: {
            status: FetchStatus;
            data: VehicleElement[];
        };
    };
    form: {
        vehicle: FormVehicle;
    };
    dealer: {
        dealerList: {
            status: FetchStatus;
            data: Dealer[];
        };
        dealerSlotList: {
            status: FetchStatus;
            data: Slot[];
        };
    };
    error: Error;
}
