/*eslint-disable */
import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import {
    RecordIds,
    UpdateStatus,
    TVehicle,
    TVehicleState,
    TCustomer,
    TRecord,
    TAppointment,
    TJourney,
    TEmailCategory,
} from '../../../../hexagon/interfaces';
import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { RecordGateway } from '../../../../hexagon/gateways/recordGateway.interface';

export class InMemoryRecordGateway extends BaseApi implements RecordGateway {
    private recordIds = {} as RecordIds;

    private records = [] as TRecord[];

    async saveVehicleInformation(
        identifier: string,
        offer: TJourney,
        vehicleInformation: TVehicle, 
    ): Promise<ApiResponse<RecordIds>> {
        if (this.recordIds) {
            return right(this.recordIds);
        }

        return left('unknown record');
    }

    async saveVehicleStateInformation(
        identifier: string,
        recordUid: string,
        vehicleState: TVehicleState ,
    ): Promise<ApiResponse<RecordIds>> {
        if (this.recordIds) {
            return right(this.recordIds);
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
        recordUid: string,
        mode?: string,
    ): Promise<ApiResponse<TRecord>> {
        const found = this.records.find((e) => e.uid === recordUid);

        if (found) {
            return right(found);
        }

        return left('unknown record');
    }

    async cancelAppointment(identifier: string, recordUid: string): Promise<ApiResponse<boolean>> {
        const found = this.records.find((e) => e.uid === recordUid);
        delete found?.appointment;

        return right(true);

    }

    async createQuotation(identifier: string, recordUid: string): Promise<ApiResponse<boolean>> {
        return right(true);
    }

    async duplicateRecord(identifier: string, recordUid: string): Promise<ApiResponse<RecordIds>> {

        const result: RecordIds = {id:100, uid:'aaa'};
        return right(result);
    }

    async updatePurchaseProject(
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
        recordUid: string,
        resaId: number,
    ): Promise<ApiResponse<TAppointment>> {
        const found = this.records.find((e) => e.uid === recordUid);

        if (!found) {
            return left('error_create_appointement');
        }

        found.appointment = <TAppointment>{ id: 1111 };
        return right(found.appointment);
    }

    async createIndicator(
        identifier: string,
        recordUid: string,
        name: string,
        value: number,
    ): Promise<ApiResponse<UpdateStatus>> {
        return right({ status: true });
    }

    async updateNotRollingProject(
        identifier: string,
        recordUid: string,
    ): Promise<ApiResponse<UpdateStatus>> {
        return right({ status: true });
    }

    async sendMail(
        identifier: string,
        recordUid: string,
        emailCategory: TEmailCategory,
    ): Promise<ApiResponse<UpdateStatus>> {
        return right({ status: true });
    }
}
