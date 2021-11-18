import {
    Dealer,
    Error,
    Slot,
    TClientConfig,
    TJourney,
    TRecord,
    TReferentialItem,
    TRefrentialElement,
} from '../hexagon/interfaces';

export type TActionStatus = 'idle' | 'pending' | 'succeeded' | 'failed' | 'saved';

export interface AppState {
    client: {
        name: string;
        journeyType: TJourney;
        config: TClientConfig;
    };
    translation: {
        status: TActionStatus;
        data: any;
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
        vehicle: any;
        vehicleName: any;
        vehicleState: any;
        particular: any;
        cascade: TReferentialItem[];
        checkZipCode: boolean;
        checkFormValid: boolean;
        updateUserInformation?: string;
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
