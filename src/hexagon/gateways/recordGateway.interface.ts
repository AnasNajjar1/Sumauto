import {
    RecordIds,
    UpdateStatus,
    VehicleInformation,
    VehicleStateInformation,
    VehicleUserInformation,
} from '../interfaces';

import { ApiResponse } from '../infra/ApiResponse';

export interface RecordGateway {
    saveVehicleInformation(
        identifier: string,
        vehicleInformation: VehicleInformation,
    ): Promise<ApiResponse<RecordIds>>;

    updateVehicleInformation(
        identifier: string,
        recordId: number,
        vehicleInformation: VehicleInformation,
    ): Promise<ApiResponse<UpdateStatus>>;

    saveVehicleStateInformation(
        identifier: string,
        vehicleStateInformation: VehicleStateInformation,
    ): Promise<ApiResponse<RecordIds>>;

    updateVehicleStateInformation(
        identifier: string,
        recordId: number,
        vehicleStateInformation: VehicleStateInformation,
    ): Promise<ApiResponse<UpdateStatus>>;

    saveUserInformation(
        identifier: string,
        vehicleUserInformation: VehicleUserInformation,
    ): Promise<ApiResponse<RecordIds>>;

    updateUserInformation(
        identifier: string,
        recordId: number,
        vehicleUserInformation: VehicleUserInformation,
    ): Promise<ApiResponse<UpdateStatus>>;
}
