/*eslint-disable */
import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import {
    RecordIds,
    UpdateStatus,
    TVehicle,
    VehicleStateInformation,
    TCustomer,
    TRecord,
    TAppointment,
} from '../../../../hexagon/interfaces';
import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { RecordGateway } from '../../../../hexagon/gateways/recordGateway.interface';

export class InMemoryRecordGateway extends BaseApi implements RecordGateway {
    private recordIds = {} as RecordIds;

    private records = [] as TRecord[];

    async saveVehicleInformation(
        identifier: string,
        vehicleInformation: TVehicle,
    ): Promise<ApiResponse<RecordIds>> {
        if (this.recordIds) {
            return right(this.recordIds);
        }

        return left('unknown record');
    }

    async updateVehicleInformation(
        identifier: string,
        recordId: number,
        vehicleInformation: TVehicle,
    ): Promise<ApiResponse<UpdateStatus>> {
        if (this.recordIds) {
            return right({ status: true });
        }

        return left('unknown record');
    }

    async saveVehicleStateInformation(
        identifier: string,
        recordUid: string,
        vehicleStateInformation: VehicleStateInformation ,
    ): Promise<ApiResponse<RecordIds>> {
        if (this.recordIds) {
            return right(this.recordIds);
        }

        return left('unknown record');
    }

    async updateVehicleStateInformation(
        identifier: string,
        recordUid: string,
        vehicleStateInformation: VehicleStateInformation,
    ): Promise<ApiResponse<UpdateStatus>> {
        if (this.recordIds) {
            return right({ status: true });
        }

        return left('unknown record');
    }

    async saveUserInformation(
        identifier: string,
        recordUid: string,
        vehicleUserInformation: TCustomer,
    ): Promise<ApiResponse<RecordIds>> {
        if (this.recordIds) {
            return right(this.recordIds);
        }

        return left('unknown record');
    }

    async updateUserInformation(
        identifier: string,
        recordUid: string,
        vehicleUserInformation: TCustomer,
    ): Promise<ApiResponse<UpdateStatus>> {
        if (this.recordIds) {
            return right({ status: true });
        }

        return left('unknown record');
    }

    async getRecord(
        identifier: string,
        recordId: string,
        mode?: string,
    ): Promise<ApiResponse<TRecord>> {
        const found = this.records.find((e) => e.uid === recordId);

        if (found) {
            return right(found);
        }

        return left('unknown record');
    }

    async cancelAppointment(identifier: string, recordId: string): Promise<ApiResponse<boolean>> {
        const found = this.records.find((e) => e.id === recordId);
        delete found?.appointment;

        return right(true);

        return left('error_delete_appointment');
    }

    async createQuotation(identifier: string, recordUid: string): Promise<ApiResponse<boolean>> {
        return right(true);
    }

    async duplicateRecord(identifier: string, recordId: string): Promise<ApiResponse<string>> {
        return right('400');
    }

    async updateSellProject(
        identifier: string,
        recordUid: string,
        delay: string,
    ): Promise<ApiResponse<UpdateStatus>> {
        return right({ status: true });
    }

    feedRecordIdsWith(recordIds: RecordIds) {
        this.recordIds = recordIds;
    }

    feedRecordsWith(records: TRecord[]) {
        this.records = records;
    }

    async createAppointment(
        identifier: string,
        recordId: number,
        resaId: number,
    ): Promise<ApiResponse<TAppointment>> {
        const found = this.records.find((e) => e.id === recordId.toString());
        if (!found) {
            return left('error_create_appointement');
        }
        found.appointment = <TAppointment>{ id: 1111 };
        return right(found.appointment);
    }
}
