export type VehicleElement = {
    id: number;
    name: string;
};

export interface Make {
    id: number;
    name: string;
}

export interface Makes {
    preferred: Make[];
    others: Make[];
}

export type Dealer = {
    id: number;
    dealerId: number;
    name: string;
    city: string;
    address: string;
    distance: number;
};

type HourStatus = 'open' | 'closed';

export type Hour = {
    id: number;
    hour: string;
    status: HourStatus;
};

export type Slot = {
    date: string;
    startHour: string;
    endHour: string;
    startBreak: string;
    endBreak: string;
    hours: Hour[];
};

export type VehicleFilters = {
    mode?: 'full' | 'long' | 'short';
    makeId?: number;
    modelId?: number;
    month?: number;
    year?: number;
    fuelId?: number;
    bodyId?: number;
    gearId?: number;
    doors?: number;
    versionId?: number;
};

export type QuestionKey =
    | 'registration'
    | 'makeLogo'
    | 'make'
    | 'model'
    | 'month'
    | 'year'
    | 'fuel'
    | 'body'
    | 'door'
    | 'gear'
    | 'engine'
    | 'version'
    | 'mileage'
    | 'imported'
    | 'running'
    | 'history'
    | 'sellProject'
    | 'email'
    | 'emailConfirmation'
    | 'zipCode'
    | 'phone'
    | 'privacy';

export type ReferentialItem =
    | 'make'
    | 'model'
    | 'version'
    | 'year'
    | 'month'
    | 'fuel'
    | 'body'
    | 'door'
    | 'gear'
    | 'engine';

export type FormValue = {
    [key: string]: string;
};

export type FormVehicle = {
    [key in QuestionKey]: string;
};

export type CarDetails = {
    status: boolean;
    makeId: string;
    modelId: string;
    month: string;
    year: string;
    bodyId: string;
    fuelId: string;
    gearboxId: string;
    doors: string;
    engine: string;
};

export type TClientConfig = {
    identifier: string;
    displayRegistrationOption: boolean;
    cascadeOrder: ReferentialItem[];
    questionsGroup: QuestionKey[][];
    required: QuestionKey[];
    zipCodeRegex: string;
    phoneRegex: string;
    mileageMin: number;
    mileageMax: number;
    registrationRegex: string;
};

export interface Error {
    description?: string;
}

export type RecordIds = {
    id: number;
    reference?: string;
};

export type VehicleInformation = {
    makeId: number;
    modelId: number;
    month: number;
    year: number;
    fuelId: number;
    bodyId: number;
    doors: number;
    gearId: number;
    engine: number;
    versionId: number;
    mileage: number;
};

export type VehicleStateInformation = {
    imported?: boolean;
    service_history?: boolean;
    interior?: boolean;
    mechanical?: boolean;
    damaged?: boolean;
    defaults?: boolean;
    running?: number;
};

export type VehicleUserInformation = {
    email?: string;
    phone?: string;
    lastName?: string;
    firstName?: string;
    zipCode?: string;
    ip?: string;
    civility?: string;
    dealerId?: number;
    unsubscribed?: number;
};

export type UpdateStatus = {
    status: boolean;
};

export type TClient = 'autocasion' | 'autoscout24' | 'unoauto';
export type RouteParams = {
    clientSlug: TClient;
};
