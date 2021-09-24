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
import { PurchaseProjectMapper } from './mappers/purchaseProjectVehicle.mapper';

export class HttpRecordGateway extends BaseApi implements RecordGateway {
    private recordIds = {} as RecordIds;

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

    async saveVehicleStateInformation(
        identifier: string,
        recordId: number,
        vehicleStateInformation: VehicleStateInformation,
    ): Promise<ApiResponse<RecordIds>> {
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

    // TODO: connect to API
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

    // TODO: connect to API
    async cancelAppointment(identifier: string, recordId: string): Promise<ApiResponse<boolean>> {
        return right(true);
    }

    // TODO: connect to API
    async createQuotation(identifier: string, recordId: number): Promise<ApiResponse<boolean>> {
        try {
            const response = await this.post(`/records/${recordId}/quotation`, {
                identifier,
                recordId,
            });

            if (response.data.status) {
                return right(response.data.status);
            }
        } catch (error) {
            return left(error as string);
        }

        return left('quotation failed');
    }

    // TODO: connect to API
    async duplicateRecord(identifier: string, recordId: string): Promise<ApiResponse<string>> {
        return right('400');
    }

    async updateSellProject(
        identifier: string,
        recordId: number,
        delay: string,
    ): Promise<ApiResponse<UpdateStatus>> {
        try {
            const params = PurchaseProjectMapper.toAutobiz(identifier, delay);

            const response = await this.put(
                `/records/${recordId}/particular/purchase-project`,
                null,
                params,
            );

            return right(response.data);
        } catch (error) {
            return left(error as string);
        }
    }
}
