import {
    Dealer,
    Error,
    FormVehicle,
    Makes,
    Slot,
    TClientConfig,
    TRecord,
    VehicleElement,
} from '../hexagon/interfaces';

export type TActionStatus = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface AppState {
    client: {
        name: string;
        recordId: string;
        status: TActionStatus;
        config: TClientConfig;
    };
    record: {
        id: number;
        status: TActionStatus;
        data: TRecord;
    };
    referential: {
        carDetails: {
            status: TActionStatus;
        };
        make: {
            status: TActionStatus;
            data: VehicleElement[];
            preferred: VehicleElement[];
        };
        model: {
            status: TActionStatus;
            data: VehicleElement[];
        };
        version: {
            status: TActionStatus;
            data: VehicleElement[];
        };
        year: {
            status: TActionStatus;
            data: VehicleElement[];
        };
        month: {
            status: TActionStatus;
            data: VehicleElement[];
        };
        fuel: {
            status: TActionStatus;
            data: VehicleElement[];
        };
        body: {
            status: TActionStatus;
            data: VehicleElement[];
        };
        door: {
            status: TActionStatus;
            data: VehicleElement[];
        };
        gear: {
            status: TActionStatus;
            data: VehicleElement[];
        };
        engine: {
            status: TActionStatus;
            data: VehicleElement[];
        };
    };
    form: {
        vehicle: FormVehicle;
    };
    dealer: {
        dealerList: {
            status: TActionStatus;
            data: Dealer[];
        };
        dealerSlotList: {
            status: TActionStatus;
            data: Slot[];
        };
    };
    error: Error;
}
