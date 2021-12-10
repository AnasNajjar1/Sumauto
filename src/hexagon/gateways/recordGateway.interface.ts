import {
    RecordIds,
    UpdateStatus,
    TVehicle,
    TVehicleState,
    TCustomer,
    TRecord,
    TAppointment,
    TJourney,
} from '../interfaces';

import { ApiResponse } from '../infra/ApiResponse';

export interface RecordGateway {
    saveVehicleInformation(
        identifier: string,
        offer: TJourney,
        vehicleInformation: TVehicle,
    ): Promise<ApiResponse<RecordIds>>;

    saveVehicleStateInformation(
        identifier: string,
        recordUid: string,
        vehicleStateInformation: TVehicleState,
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

    duplicateRecord(identifier: string, recordUid: string): Promise<ApiResponse<RecordIds>>;

    cancelAppointment(identifier: string, recordUid: string): Promise<ApiResponse<boolean>>;

    createAppointment(
        identifier: string,
        recordUid: string,
        resaId: number,
    ): Promise<ApiResponse<TAppointment>>;

    updatePurchaseProject(
        identifier: string,
        recordUid: string,
        delay: string,
    ): Promise<ApiResponse<UpdateStatus>>;

    createIndicator(
        identifier: string,
        recordUid: string,
        name: string,
        value: number,
    ): Promise<ApiResponse<UpdateStatus>>;

    updateNotRollingProject(
        identifier: string,
        recordUid: string,
    ): Promise<ApiResponse<UpdateStatus>>;
}
