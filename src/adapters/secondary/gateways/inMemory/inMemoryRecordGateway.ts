import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import {
    RecordIds,
    UpdateStatus,
    TVehicle,
    VehicleStateInformation,
    TCustomer,
    TRecord,
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
        vehicleStateInformation: VehicleStateInformation,
    ): Promise<ApiResponse<RecordIds>> {
        if (this.recordIds) {
            return right(this.recordIds);
        }

        return left('unknown record');
    }

    async updateVehicleStateInformation(
        identifier: string,
        recordId: number,
        vehicleStateInformation: VehicleStateInformation,
    ): Promise<ApiResponse<UpdateStatus>> {
        if (this.recordIds) {
            return right({ status: true });
        }

        return left('unknown record');
    }

    async saveUserInformation(
        identifier: string,
        vehicleUserInformation: TCustomer,
    ): Promise<ApiResponse<RecordIds>> {
        if (this.recordIds) {
            return right(this.recordIds);
        }

        return left('unknown record');
    }

    async updateUserInformation(
        identifier: string,
        recordId: number,
        vehicleUserInformation: TCustomer,
    ): Promise<ApiResponse<UpdateStatus>> {
        if (this.recordIds) {
            return right({ status: true });
        }

        return left('unknown record');
    }

    async getRecord(identifier: string, recordId: string): Promise<ApiResponse<TRecord>> {
        const found = this.records.find((e) => e.id === Number(recordId));

        if (found) {
            return right(found);
        }

        return left('unknown record');
    }

    async cancelAppointment(identifier: string, recordId: string): Promise<ApiResponse<boolean>> {
        // Do something

        return right(true);
    }

    feedRecordIdsWith(recordIds: RecordIds) {
        this.recordIds = recordIds;
    }

    feedRecordsWith(records: TRecord[]) {
        this.records = records;
    }
}
