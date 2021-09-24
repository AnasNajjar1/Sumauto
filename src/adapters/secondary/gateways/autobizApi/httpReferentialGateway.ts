import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import {
    ReferentialGateway,
    Scope,
} from '../../../../hexagon/gateways/referentialGateway.interface';
import {
    TReferentialItem,
    CarDetails,
    Makes,
    VehicleFormFilters,
    UpdateStatus,
} from '../../../../hexagon/interfaces';

import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { CarDetailsMapper } from './mappers/carDetails.mapper';
import { MakesMapper } from './mappers/makes.mapper';
import { ReferentialQueryParamsMapper } from './mappers/referentialQueryParams.mapper';
import { ReferentialMapper } from './mappers/vehicleFilter.mapper';

export class HttpReferentialGateway extends BaseApi implements ReferentialGateway {
    async requestAllMakes(identifier: string): Promise<ApiResponse<Makes>> {
        try {
            const response = await this.get(`/referentials/makes?identifier=${identifier}`);
            return right(MakesMapper.toApp(response.data));
        } catch (error) {
            return left(error as string);
        }
    }

    async requestList(
        identifier: string,
        scope: TReferentialItem,
        filters: VehicleFormFilters,
    ): Promise<ApiResponse<Scope[]>> {
        try {
            const queryString = this.encodeQueryData(
                ReferentialQueryParamsMapper.toAutobiz({ ...filters, ...{ identifier } }),
            );

            let url = '/referentials/';

            switch (scope) {
                case 'make':
                    url += `makes`;
                    break;

                case 'model':
                    url += `make/${filters.make}/models`;
                    break;

                case 'version':
                    url += `make/${filters.make}/model/${filters.model}/versions`;
                    break;

                case 'month':
                    url += `make/${filters.make}/model/${filters.model}/months`;
                    break;

                case 'year':
                    url += `make/${filters.make}/model/${filters.model}/years`;
                    break;

                case 'fuel':
                    url += `make/${filters.make}/model/${filters.model}/fuels`;
                    break;

                case 'body':
                    url += `make/${filters.make}/model/${filters.model}/bodies`;
                    break;

                case 'door':
                    url += `make/${filters.make}/model/${filters.model}/doors`;
                    break;

                case 'gear':
                    url += `make/${filters.make}/model/${filters.model}/gears`;
                    break;

                case 'engine':
                    url += `make/${filters.make}/model/${filters.model}/engines`;
                    break;

                default:
                    break;
            }

            url += `?${queryString}`;

            const response = await this.get(url);

            const data = Array.isArray(response.data) ? response.data : [response.data];
            if (data.length === 0) {
                return left('no_result');
            }

            // TODO Mapper.toApp
            return right(data);
        } catch (error) {
            return left(error as string);
        }
    }

    async requestCartDetailsByRegsitration(
        identifier: string,
        registration: string,
    ): Promise<ApiResponse<CarDetails>> {
        try {
            const response = await this.get(
                `/referentials/car-details/${registration}?identifier=${identifier}`,
            );

            return right(CarDetailsMapper.toApp(response.data));
        } catch (error) {
            return left(error as string);
        }
    }

    private encodeQueryData(data: any) {
        const ret = [];

        for (const d in data) {
            if (data[d]) {
                ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
            }
        }

        return ret.join('&');
    }

    async checkZipCode(identifier: string, zipCode: string): Promise<ApiResponse<UpdateStatus>> {
        try {
            const response = await this.get(
                `/referentials/zip-code/${zipCode}?identifier=${identifier}`,
            );
            return right(response.data);
        } catch (error) {
            return left(error as string);
        }
    }
}
