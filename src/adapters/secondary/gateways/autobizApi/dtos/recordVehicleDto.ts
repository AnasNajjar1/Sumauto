import { TJourney } from '../../../../../hexagon/interfaces';

export interface AutobizRecordVehicleDto {
    identifier: string;
    offer: TJourney;
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
}
