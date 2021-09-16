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
            // return right(response.data);
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
                    url += `/makes`;
                    break;

                case 'model':
                    url += `/models?makeId=${filters.makeId}`;
                    break;

                case 'version':
                    url += `/make/${filters.makeId}/model/${filters.modelId}/versions${queryString}`;
                    break;

                case 'year':
                    url += `/make/${filters.makeId}/model/${filters.modelId}/years${queryString}`;
                    break;

                case 'month':
                    url += `/make/${filters.makeId}/model/${filters.modelId}/months${queryString}`;
                    break;

                case 'fuel':
                    url += `/make/${filters.makeId}/model/${filters.modelId}/fuels${queryString}`;
                    break;

                case 'body':
                    url += `/make/${filters.makeId}/model/${filters.modelId}/bodies${queryString}`;
                    break;

                case 'door':
                    url += `/make/${filters.makeId}/model/${filters.modelId}/doors${queryString}`;
                    break;

                case 'gear':
                    url += `/make/${filters.makeId}/model/${filters.modelId}/gears${queryString}`;
                    break;

                case 'engine':
                    url += `/make/${filters.makeId}/model/${filters.modelId}/engines${queryString}`;
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

    async requestCartDetailsByRegsitration(registration: string): Promise<ApiResponse<CarDetails>> {
        try {
            const response = await this.get(
                `${API_URL_PREFIX}/car-details/registration/${registration}/fr`,
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
                ret.push(encodeURIComponent(d) + separator + encodeURIComponent(data[d]));
            }
        }
        const prefix = format === '&' ? '?' : '';
        return prefix + ret.join(format);
    }
}
