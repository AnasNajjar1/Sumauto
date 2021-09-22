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

    updateVehicleInformation(
        identifier: string,
        recordId: number,
        vehicleInformation: TVehicle,
    ): Promise<ApiResponse<UpdateStatus>>;

    saveVehicleStateInformation(
        identifier: string,
        recordId: number,
        vehicleStateInformation: VehicleStateInformation,
    ): Promise<ApiResponse<RecordIds>>;

    updateVehicleStateInformation(
        identifier: string,
        recordId: number,
        vehicleStateInformation: VehicleStateInformation,
    ): Promise<ApiResponse<UpdateStatus>>;

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

    duplicateRecord(identifier: string, recordId: string): Promise<ApiResponse<string>>;

    checkZipCode(identifier: string, zipCode: string): Promise<ApiResponse<boolean>>;

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
}
