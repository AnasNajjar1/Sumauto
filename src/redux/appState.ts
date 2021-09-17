import {
    Dealer,
    Error,
    FormVehicle,
    Make,
    Makes,
    Slot,
    TClientConfig,
    TRecord,
    TReferentialItem,
    VehicleElement,
} from '../hexagon/interfaces';

export type TActionStatus = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface AppState {
    client: {
        name: string;
        journeyType: string;
        config: TClientConfig;
    };
    unsubscribe: {
        status: TActionStatus;
    };
    cancelAppoitment: {
        status: TActionStatus;
    };
    record: {
        id: number;
        status: TActionStatus;
        data: TRecord;
    };
    referential: {
        filter: any;
        cascade: TReferentialItem[];
        make: {
            status: TActionStatus;
            data: Make[];
        };
        model: {
            status: TActionStatus;
            data: Make[];
        };
        version: {
            status: TActionStatus;
            data: VehicleElement[];
        };
        body: {
            status: TActionStatus;
            data: VehicleElement[];
        };
        fuel: {
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
