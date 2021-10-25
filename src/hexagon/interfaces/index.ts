import { string } from 'fp-ts';

export type Dealer = {
    id: string;
    name: string;
    city: string;
    address: string;
    distance: number;
};

type HourStatus = 'open' | 'closed';

export type Hour = {
    id: string | null;
    hour: string;
    status: HourStatus;
};

// export type Slots = {
//     slots: Slot[];
// };

export type Slot = {
    date: string;
    hours?: Hour[];
};

export type VehicleFormFilters = {
    make?: string;
    model?: string;
    month?: string;
    year?: string;
    fuel?: string;
    body?: string;
    gear?: string;
    door?: string;
    engine?: string;
    version?: string;
    identifier: string;
};

export type FormValue = {
    [key: string]: string;
};

export type TReferentialItem =
    | 'make'
    | 'model'
    | 'version'
    | 'year'
    | 'month'
    | 'fuel'
    | 'body'
    | 'door'
    | 'gear'
    | 'engine'
    | 'mileage';

export type TVehicleStateItem = 'imported' | 'history' | 'running' | 'purchaseProject';
export type TParticularItem = 'zipCode' | 'email' | 'phone' | 'name';

export type QuestionKey = TReferentialItem | TVehicleStateItem | TParticularItem;

export type FormVehicle = {
    [key in QuestionKey]: string;
};

export type CarDetails = {
    make: string;
    makeName: string;
    model: string;
    modelName: string;
    month: string;
    monthName: string;
    year: string;
    body: string;
    bodyName: string;
    fuel: string;
    fuelName: string;
    gear: string;
    gearName: string;
    door: string;
    engine: string;
};

export type TClientConfig = {
    lang: 'es';
    locale: string;
    name: string;
    currency: string;
    identifier: string;
    privateSellLink?: string;
    displayRegistrationOption: boolean;
    zipCodeRegex: string;
    phoneRegex: string;
    emailConfirmation: boolean;
    registrationRegex: string;
};

export interface Error {
    description?: string;
}

export type RecordIds = {
    id: number;
    uid: string;
    reference?: string;
};

export type TVehicle = {
    make: string;
    model: string;
    month: string;
    year: string;
    fuel: string;
    body: string;
    door: string;
    gear: string;
    engine: string;
    version: string;
    mileage: string;
};

export type VehicleStateInformation = {
    imported: string;
    running: string;
    history: string;
};

export type TValuation = {
    privateValue: number;
    value: number;
    date: Date;
};

export type TCustomer = {
    email: string;
    phone: string;
    zipCode: string;
    name?: string;
};

export type TVehicleNames = {
    makeId: string;
    makeName: string;
    modelName: string;
    year: string;
    month: string;
    registrationDate: Date;
    fuelName: string;
    bodyName: string;
    engineName: string;
    gearName: string;
    mileage: number;
    import: boolean;
    versionName: string;
    doors: string;
};

export type TCoordinates = {
    lat: number;
    lng: number;
};

export type TAppointment = {
    id: number;
    createdAt: string;
    updatedAt: string;
    status: boolean;
    lastOne: string;
    active: string;
    appointmentDate: string;
    startHour: string;
    endHour: string;
    expertId: number;
    expertName: string;
    networkId: number;
    dealerId: number;
    dealerName: string;
    realDealerName: string;
    address: string;
    zipCode: number;
    city: string;
    phone: string;
    latitude: number;
    longitude: number;
};
export type TOfferStatus = 'EXPIRED' | 'CONFIRMED' | 'NO_APPOINTMENT' | 'UNQUOTABLE';

export type TRecord = {
    id: string;
    uid: string;
    offerStatus: TOfferStatus;
    offerNumber: string;
    customer: TCustomer;
    vehicle: TVehicleNames;
    valuation?: TValuation;
    appointment?: TAppointment;
};

export type UpdateStatus = {
    status: boolean;
};

export type TClient = 'autocasion' | 'autoscout24' | 'unoauto';
export type TJourney = 'sale' | 'valuation';
export type RouteParams = {
    clientSlug: TClient;
    journeyType: TJourney;
};

export type TSubscription = {
    identifier: string;
    email: string;
    phone?: string;
};
export type TRefrentialElement = {
    id: number;
    name: string;
};

export interface Makes {
    preferred: TRefrentialElement[];
    others: TRefrentialElement[];
    all: TRefrentialElement[];
}

export type TPurchaseDelay = {
    name: string;
    value: string;
};
