import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import {
    RecordIds,
    UpdateStatus,
    VehicleInformation,
    VehicleStateInformation,
    VehicleUserInformation,
} from '../../../../hexagon/interfaces';
import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { RecordGateway } from '../../../../hexagon/gateways/recordGateway.interface';

export class InMemoryRecordGateway extends BaseApi implements RecordGateway {
    private recordIds = {} as RecordIds;

    async saveVehicleInformation(
        identifier: string,
        vehicleInformation: VehicleInformation,
    ): Promise<ApiResponse<RecordIds>> {
        if (this.recordIds) {
            return right(this.recordIds);
        }

        return left('unknown record');
    }

    async updateVehicleInformation(
        identifier: string,
        recordId: number,
        vehicleInformation: VehicleInformation,
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
        vehicleUserInformation: VehicleUserInformation,
    ): Promise<ApiResponse<RecordIds>> {
        if (this.recordIds) {
            return right(this.recordIds);
        }

        return left('unknown record');
    }

    async updateUserInformation(
        identifier: string,
        recordId: number,
        vehicleUserInformation: VehicleUserInformation,
    ): Promise<ApiResponse<UpdateStatus>> {
        if (this.recordIds) {
            return right({ status: true });
        }

        return left('unknown record');
    }

    feedWith(recordIds: RecordIds) {
        this.recordIds = recordIds;
    }
}
