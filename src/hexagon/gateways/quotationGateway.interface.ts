import { VehicleElement } from '../interfaces';

import { ApiResponse } from '../infra/ApiResponse';

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

export interface ReferentialGateway {
    requestAllMakes(): Promise<ApiResponse<VehicleElement[]>>;

    requestAllModels(makeId: number): Promise<ApiResponse<VehicleElement[]>>;

    requestAllVersions(
        makeId: number,
        modelId: number,
        filters?: VehicleFilters,
    ): Promise<ApiResponse<VehicleElement[]>>;
}
