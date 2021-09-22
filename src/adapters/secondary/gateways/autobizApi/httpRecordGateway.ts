import { left, right } from 'fp-ts/Either';
import { string } from 'fp-ts';
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
import { RecordVehicleMapper } from './mappers/recordVehicle.mapper';
import { RecordUserMapper } from './mappers/recordUser.mapper';
import { RecordVehicleStateMapper } from './mappers/recordVehicleState.mapper';
import { RecordMapper } from './mappers/record.mapper';

export class HttpRecordGateway extends BaseApi implements RecordGateway {
    private recordIds = {} as RecordIds;

    private records = [] as TRecord[];

    async saveVehicleInformation(
        identifier: string,
        vehicleInformation: TVehicle,
    ): Promise<ApiResponse<RecordIds>> {
        try {
            const data = RecordVehicleMapper.toAutobiz(identifier, vehicleInformation);

            const response = await this.post(`/records`, data);

            if (response) {
                return right(response.data);
            }
        } catch (error) {
            return left(error as string);
        }
        return left('not-saving_record');
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
        recordId: number,
        vehicleStateInformation: VehicleStateInformation,
    ): Promise<ApiResponse<RecordIds>> {
        // if (this.recordIds) {
        //     return right(this.recordIds);
        // }

        // return left('unknown record');

        try {
            const data = RecordVehicleStateMapper.toAutobiz(
                identifier,
                recordId,
                vehicleStateInformation,
            );

            const response = await this.post(`/records/${recordId}/state`, data);

            if (response) {
                return right(response.data);
            }
        } catch (error) {
            return left(error as string);
        }
        return left('not_saving_record');
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
        recordId: number,
        vehicleUserInformation: TCustomer,
    ): Promise<ApiResponse<RecordIds>> {
        try {
            const data = RecordUserMapper.toAutobiz(identifier, recordId, vehicleUserInformation);

            const response = await this.post(`/records/${recordId}/particular`, data);

            if (response) {
                return right(response.data);
            }
        } catch (error) {
            return left(error as string);
        }
        return left('not_saving_record');
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
        try {
            const response = await this.get(`/records/${recordId}?identifier=${identifier}`);

            if (response) {
                const dto = RecordMapper.toApp(response.data);

                if (dto.id) {
                    return right(dto);
                }

                return left('unknown record');
            }
        } catch (error) {
            return left(error as string);
        }

        return left('unknown record');
    }

    async cancelAppointment(identifier: string, recordId: string): Promise<ApiResponse<boolean>> {
        // Do something

        return right(true);
    }

    async createQuotation(identifier: string, recordId: string): Promise<ApiResponse<boolean>> {
        // Do something

        return right(true);
    }

    async duplicateRecord(identifier: string, recordId: string): Promise<ApiResponse<string>> {
        return right('400');
    }

    async updateSellProject(
        identifier: string,
        recordId: string,
        delay: string,
    ): Promise<ApiResponse<boolean>> {
        // Do something

        return right(true);
    }

    async checkZipCode(identifier: string, zipCode: string): Promise<ApiResponse<boolean>> {
        return right(true);
    }

    feedRecordIdsWith(recordIds: RecordIds) {
        this.recordIds = recordIds;
    }

    feedRecordsWith(records: TRecord[]) {
        this.records = records;
    }
}
