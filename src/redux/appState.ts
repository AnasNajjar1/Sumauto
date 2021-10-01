import {
    CarDetails,
    Dealer,
    Error,
    Slot,
    TClientConfig,
    TRecord,
    TReferentialItem,
    TRefrentialElement,
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
    cancelAppointment: {
        status: TActionStatus;
    };
    record: {
        id: number;
        uid: string;
        status: TActionStatus;
        data: TRecord;
    };
    carDetails: {
        status: TActionStatus;
        // data: CarDetails;
    };
    form: {
        vehicle: any; // TODO type this
        vehicleName: any; // TODO type this
        vehicleState: any; // TODO type this
        particular: any; // TODO type this
        cascade: TReferentialItem[];
        checkZipCode: boolean;
        checkFormValid: boolean;

        referential: {
            make: {
                status: TActionStatus;
                data: TRefrentialElement[];
            };
            model: {
                status: TActionStatus;
                data: TRefrentialElement[];
            };
            version: {
                status: TActionStatus;
                data: TRefrentialElement[];
            };
            body: {
                status: TActionStatus;
                data: TRefrentialElement[];
            };
            fuel: {
                status: TActionStatus;
                data: TRefrentialElement[];
            };
            year: {
                status: TActionStatus;
                data: TRefrentialElement[];
            };
            month: {
                status: TActionStatus;
                data: TRefrentialElement[];
            };
        };
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
