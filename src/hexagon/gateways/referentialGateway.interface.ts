import { CarDetails, Makes, ReferentialItem, VehicleElement, VehicleFilters } from '../interfaces';

import { ApiResponse } from '../infra/ApiResponse';

export type Scope = VehicleElement;

export interface ReferentialGateway {
    requestAllMakes(identifier: string, makeId?: number): Promise<ApiResponse<Makes>>;

    requestList(
        identifier: string,
        scope: ReferentialItem,
        filters?: VehicleFilters,
    ): Promise<ApiResponse<VehicleElement[]>>;

    requestCartDetailsByRegsitration(registration: string): Promise<ApiResponse<CarDetails>>;
}
