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
import { RecordVehicleMapper } from './mappers/recordVehicle.mapper';
import { RecordUserMapper } from './mappers/recordUser.mapper';
import { RecordVehicleStateMapper } from './mappers/recordVehicleState.mapper';
import { RecordMapper } from './mappers/record.mapper';
import { PurchaseProjectMapper } from './mappers/purchaseProjectVehicle.mapper';
import { AppointmentMapper } from './mappers/appointment.mapper';
import { NotRollingProjectMapper } from './mappers/notRollingProjectVehicle.mapper';
import { SendMailMapper } from './mappers/sendMail.mapper';

export class HttpRecordGateway extends BaseApi implements RecordGateway {
    async saveVehicleInformation(
        identifier: string,
        offer: TJourney,
        vehicleInformation: TVehicle,
    ): Promise<ApiResponse<RecordIds>> {
        try {
            const data = RecordVehicleMapper.toAutobiz(identifier, offer, vehicleInformation);
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
        recordUid: string,
        vehicleState: TVehicleState,
    ): Promise<ApiResponse<RecordIds>> {
        try {
            const data = RecordVehicleStateMapper.toAutobiz(identifier, recordUid, vehicleState);

            const response = await this.post(`/record/${recordUid}/state`, data);

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
        recordUid: string,
        vehicleUserInformation: TCustomer,
    ): Promise<ApiResponse<RecordIds>> {
        try {
            const data = RecordUserMapper.toAutobiz(identifier, recordUid, vehicleUserInformation);

            const response = await this.post(`/customers/${recordUid}`, data);

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
        recordUid: string,
        vehicleUserInformation: TCustomer,
    ): Promise<ApiResponse<UpdateStatus>> {
        try {
            const data = RecordUserMapper.toAutobiz(identifier, recordUid, vehicleUserInformation);

            const response = await this.put(`/customers/${recordUid}`, data);

            return right(response.data);
        } catch (error) {
            return left(error as string);
        }
    }

    async getRecord(
        identifier: string,
        recordUid: string,
        mode?: string,
    ): Promise<ApiResponse<TRecord>> {
        try {
            const uri = `/records/${recordUid}?identifier=${identifier}`;
            const response = await this.get(mode ? `${uri}&mode=${mode}` : uri);

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

    async cancelAppointment(identifier: string, recordUid: string): Promise<ApiResponse<boolean>> {
        try {
            const response = await this.delete(`/record/${recordUid}/appointments`, {
                identifier,
            });

            return right(response.data.status);
        } catch (error) {
            return left(error as string);
        }
    }

    async createQuotation(identifier: string, recordUid: string): Promise<ApiResponse<boolean>> {
        try {
            const response = await this.post(`/record/${recordUid}/quotation`, {
                identifier,
            });

            return right(response.data.status);
        } catch (error) {
            return left(error as string);
        }
    }

    async duplicateRecord(identifier: string, recordUid: string): Promise<ApiResponse<RecordIds>> {
        try {
            const response = await this.get(
                `/record/${recordUid}/duplicate?identifier=${identifier}`,
            );

            if (response.data.uid) {
                return right(response.data);
            }

            return left('duplication failed');
        } catch (error) {
            return left(error as string);
        }
    }

    async updatePurchaseProject(
        identifier: string,
        recordUid: string,
        delay: string,
    ): Promise<ApiResponse<UpdateStatus>> {
        try {
            const data = PurchaseProjectMapper.toAutobiz(identifier, delay);

            const response = await this.put(`/customer/${recordUid}/purchase-project`, data);

            return right(response.data);
        } catch (error) {
            return left(error as string);
        }
    }

    async createAppointment(
        identifier: string,
        recordUid: string,
        resaId: number,
    ): Promise<ApiResponse<TAppointment>> {
        try {
            const response = await this.post(`/record/${recordUid}/appointments`, {
                identifier,
                resaId,
            });

            const appointment = AppointmentMapper.toApp(response.data);
            return right(appointment);
        } catch (error) {
            return left(error as string);
        }
    }

    async createIndicator(
        identifier: string,
        recordUid: string,
        name: string,
        value: number,
    ): Promise<ApiResponse<UpdateStatus>> {
        try {
            const response = await this.post(`/record/${recordUid}/indicator`, {
                identifier,
                indicatorName: name,
                indicatorValue: value,
            });

            return right(response.data);
        } catch (error) {
            return left(error as string);
        }

        return right({ status: true });
    }

    async updateNotRollingProject(
        identifier: string,
        recordUid: string,
    ): Promise<ApiResponse<UpdateStatus>> {
        try {
            const data = NotRollingProjectMapper.toAutobiz(identifier);

            const response = await this.put(`/record/${recordUid}/not-rolling`, data);

            return right(response.data);
        } catch (error) {
            return left(error as string);
        }
    }

    async sendMail(
        identifier: string,
        recordUid: string,
        emailCategory: TEmailCategory,
    ): Promise<ApiResponse<UpdateStatus>> {
        try {
            const data = SendMailMapper.toAutobiz(identifier, emailCategory);

            const response = await this.post(`/record/${recordUid}/send-mail`, data);

            return right(response.data);
        } catch (error) {
            return left(error as string);
        }
    }
}
