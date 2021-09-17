import {
    CarDetails,
    Makes,
    ReferentialItem,
    VehicleElement,
    VehicleFormFilters,
} from '../interfaces';

import { ApiResponse } from '../infra/ApiResponse';

export type Scope = VehicleElement;

export interface ReferentialGateway {
    requestAllMakes(identifier: string, makeId?: number): Promise<ApiResponse<Makes>>;

    requestList(
        identifier: string,
        scope: ReferentialItem,
        filters?: VehicleFormFilters,
    ): Promise<ApiResponse<VehicleElement[]>>;

    requestCartDetailsByRegsitration(
        identifier: string,
        registration: string,
    ): Promise<ApiResponse<CarDetails>>;
}
