import {
    RecordIds,
    UpdateStatus,
    TVehicle,
    VehicleStateInformation,
    TCustomer,
    TRecord,
} from '../interfaces';

import { ApiResponse } from '../infra/ApiResponse';

export interface RecordGateway {
    saveVehicleInformation(
        identifier: string,
        vehicleInformation: TVehicle,
    ): Promise<ApiResponse<RecordIds>>;

    saveVehicleStateInformation(
        identifier: string,
        recordId: number,
        vehicleStateInformation: VehicleStateInformation,
    ): Promise<ApiResponse<RecordIds>>;

    saveUserInformation(
        identifier: string,
        recordId: number,
        vehicleUserInformation: TCustomer,
    ): Promise<ApiResponse<RecordIds>>;

    updateUserInformation(
        identifier: string,
        recordId: number,
        vehicleUserInformation: TCustomer,
    ): Promise<ApiResponse<UpdateStatus>>;

    getRecord(identifier: string, recordId: string): Promise<ApiResponse<TRecord>>;

    createQuotation(identifier: string, recordId: number): Promise<ApiResponse<boolean>>;

    duplicateRecord(identifier: string, recordId: string): Promise<ApiResponse<string>>;

    cancelAppointment(identifier: string, recordId: string): Promise<ApiResponse<boolean>>;

    // createAppointment(
    //     identifier: string,
    //     recordId: string,
    //     resadId: string,
    // ): Promise<ApiResponse<boolean>>;

    // updateAppointment(
    //     identifier: string,
    //     recordId: string,
    //     resadId: string,
    // ): Promise<ApiResponse<boolean>>;

    updateSellProject(
        identifier: string,
        recordId: number,
        delay: string,
    ): Promise<ApiResponse<UpdateStatus>>;
}
