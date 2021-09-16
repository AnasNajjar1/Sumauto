import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import {
    ReferentialGateway,
    Scope,
} from '../../../../hexagon/gateways/referentialGateway.interface';
import { ReferentialItem, CarDetails, VehicleFilters, Makes } from '../../../../hexagon/interfaces';

import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { CarDetailsMapper } from './mappers/carDetails.mapper';
import { MakesMapper } from './mappers/makes.mapper';

const API_URL_PREFIX = 'https://api-c2b.autobiz.com/v1';
export class HttpReferentialGateway extends BaseApi implements ReferentialGateway {
    async requestAllMakes(identifier: string): Promise<ApiResponse<Makes>> {
        try {
            const response = await this.get(
                `${API_URL_PREFIX}/referentials/makes?identifier=${identifier}`,
            );
            return right(MakesMapper.toDto(response.data));
        } catch (error) {
            return left(error as string);
        }
    }

    async requestList(
        identifier: string,
        scope: ReferentialItem,
        filters: VehicleFilters,
    ): Promise<ApiResponse<Scope[]>> {
        try {
            const queryString = this.encodeQueryData(filters, '&');

            let url = API_URL_PREFIX;

            switch (scope) {
                case 'make':
                    url += `/referentials/makes?identifier=${identifier}`;
                    break;

                case 'model':
                    url += `/referentials/make/${filters.makeId}/models?identifier=${identifier}`;
                    break;

                case 'version':
                    url += `/referentials/make/${filters.makeId}/model/${filters.modelId}/versions${queryString}&identifier=${identifier}`;
                    break;

                case 'month':
                    url += `/referentials/make/${filters.makeId}/model/${filters.modelId}/months${queryString}&identifier=${identifier}`;
                    break;

                case 'year':
                    url += `/referentials/make/${filters.makeId}/model/${filters.modelId}/years${queryString}&identifier=${identifier}`;
                    break;

                case 'fuel':
                    url += `/referentials/make/${filters.makeId}/model/${filters.modelId}/fuels${queryString}&identifier=${identifier}`;
                    break;

                case 'body':
                    url += `/referentials/make/${filters.makeId}/model/${filters.modelId}/bodies${queryString}&identifier=${identifier}`;
                    break;

                case 'door':
                    url += `/referentials/make/${filters.makeId}/model/${filters.modelId}/doors${queryString}&identifier=${identifier}`;
                    break;

                case 'gear':
                    url += `/referentials/make/${filters.makeId}/model/${filters.modelId}/gears${queryString}&identifier=${identifier}`;
                    break;

                case 'engine':
                    url += `/referentials/make/${filters.makeId}/model/${filters.modelId}/engines${queryString}&identifier=${identifier}`;
                    break;

                default:
                    break;
            }

            const response = await this.get(url);
            const data = Array.isArray(response.data) ? response.data : [response.data];
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
                `${API_URL_PREFIX}/referentials/car-details/${registration}?identifier=${identifier}`,
            );

            return right(CarDetailsMapper.toDto(response.data));
        } catch (error) {
            return left(error as string);
        }
    }

    private encodeQueryData(data: any, format: '&' | '/') {
        const ret = [];

        const separator = format === '&' ? '=' : '/';
        for (const d in data) {
            if (data[d]) {
                if (d !== 'makeId' && d !== 'modelId')
                    ret.push(encodeURIComponent(d) + separator + encodeURIComponent(data[d]));
            }
        }
        const prefix = format === '&' ? '?' : '';
        return prefix + ret.join(format);
    }
}
