export interface AutobizVehicleType {
    id: number;
    code: string;
    name: string;
}

export interface AutobizVersion {
    id: number;
    name: string;
    finish: string;
    generation?: any;
    type: string;
    ref: boolean;
    mcclbp: boolean;
    observed: boolean;
    preferred: boolean;
}

export interface AutobizCarDetailsDto {
    registration: string;
    vin: string;
    brandId: number;
    brandLabel: string;
    modelId: number;
    modelLabel: string;
    bodyId: number;
    bodyLabel: string;
    regDate: string;
    dateCG: any;
    door: number;
    fuelId: number;
    fuelLabel: string;
    gearId: number;
    gearLabel: string;
    liter: number;
    fiscal: any;
    firstHand: any;
    ps: number;
    kw: number;
    color: any;
    seats: number;
}
