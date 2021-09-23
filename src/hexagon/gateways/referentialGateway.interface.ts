import {
    CarDetails,
    Makes,
    TReferentialItem,
    TRefrentialElement,
    VehicleFormFilters,
} from '../interfaces';

import { ApiResponse } from '../infra/ApiResponse';

export type Scope = TRefrentialElement;

export interface ReferentialGateway {
    requestAllMakes(identifier: string, makeId?: number): Promise<ApiResponse<Makes>>;

    requestList(
        identifier: string,
        scope: TReferentialItem,
        filters?: VehicleFormFilters,
    ): Promise<ApiResponse<TRefrentialElement[]>>;

    requestCartDetailsByRegsitration(
        identifier: string,
        registration: string,
    ): Promise<ApiResponse<CarDetails>>;

    checkZipCode(identifier: string, zipCode: string): Promise<ApiResponse<boolean>>;
}
