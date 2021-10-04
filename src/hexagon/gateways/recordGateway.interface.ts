import {
    RecordIds,
    UpdateStatus,
    TVehicle,
    VehicleStateInformation,
    TCustomer,
    TRecord,
    TAppointment,
} from '../interfaces';

import { ApiResponse } from '../infra/ApiResponse';

export interface RecordGateway {
    saveVehicleInformation(
        identifier: string,
        vehicleInformation: TVehicle,
    ): Promise<ApiResponse<RecordIds>>;

    saveVehicleStateInformation(
        identifier: string,
        recordUid: string,
        vehicleStateInformation: VehicleStateInformation,
    ): Promise<ApiResponse<RecordIds>>;

    saveUserInformation(
        identifier: string,
        recordUid: string,
        vehicleUserInformation: TCustomer,
    ): Promise<ApiResponse<RecordIds>>;

    updateUserInformation(
        identifier: string,
        recordUid: string,
        vehicleUserInformation: TCustomer,
    ): Promise<ApiResponse<UpdateStatus>>;

    getRecord(identifier: string, recordUid: string, mode?: string): Promise<ApiResponse<TRecord>>;

    createQuotation(identifier: string, recordUid: string): Promise<ApiResponse<boolean>>;

    duplicateRecord(identifier: string, recordUid: string): Promise<ApiResponse<string>>;

    cancelAppointment(identifier: string, recordUid: string): Promise<ApiResponse<boolean>>;

    createAppointment(
        identifier: string,
        recordUid: string,
        resaId: number,
    ): Promise<ApiResponse<TAppointment>>;

    updateSellProject(
        identifier: string,
        recordUid: string,
        delay: string,
    ): Promise<ApiResponse<UpdateStatus>>;
}
