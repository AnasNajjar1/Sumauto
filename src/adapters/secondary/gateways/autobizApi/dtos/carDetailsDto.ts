export interface VehicleType {
    id: number;
    code: string;
    name: string;
}

export interface Version {
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

export interface CarDetailsDto {
    status: boolean;
    registration: string;
    vin: string;
    typeMine?: any;
    engineCode?: any;
    makeId: number;
    makeName: string;
    modelId: number;
    modelName: string;
    bodyId: number;
    bodyName: string;
    fuelId: number;
    fuelName: string;
    gearboxId: number;
    gearboxName: string;
    doors: number;
    seats: number;
    kw: number;
    engine: number;
    fiscal: number;
    liter: number;
    cylinder: number;
    cylinderCapacity: number;
    speedNumber: number;
    co2Emissions: number;
    tyreDimension: string[];
    dpf: boolean;
    d4w: boolean;
    color: string;
    propulsion: string;
    height?: any;
    width?: any;
    length?: any;
    emptyWeight?: any;
    wheelbase?: any;
    firstHand: boolean;
    dateRelease: string;
    dateProduction?: any;
    dateGrayCard: string;
    vehicleGrayCardCode?: any;
    vehicleType: VehicleType;
    versions: Version[];
    alerts?: any;
    warnings: any[];
    errors: any[];
}
