import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import {
    ReferentialGateway,
    Scope,
} from '../../../../hexagon/gateways/referentialGateway.interface';
import { ReferentialItem, CarDetails, VehicleFilters, Makes } from '../../../../hexagon/interfaces';

import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { CarDetailsMapper } from './mappers/carDetails.mapper';

const API_URL_PREFIX = 'https://apiv2.autobiz.com/referential/v1';
export class HttpReferentialGateway extends BaseApi implements ReferentialGateway {
    async requestAllMakes(identifier: string): Promise<ApiResponse<Makes>> {
        try {
            const response = await this.get(`${API_URL_PREFIX}/makes`);

            const faked = {
                preferred: [
                    {
                        id: 92,
                        name: 'VOLKSWAGEN',
                    },
                    {
                        id: 76,
                        name: 'MERCEDES',
                    },
                    {
                        id: 57,
                        name: 'BMW',
                    },
                    {
                        id: 55,
                        name: 'AUDI',
                    },
                    {
                        id: 84,
                        name: 'RENAULT',
                    },
                    {
                        id: 82,
                        name: 'PEUGEOT',
                    },
                    {
                        id: 86,
                        name: 'SEAT',
                    },
                    {
                        id: 59,
                        name: 'CITROEN',
                    },
                    {
                        id: 64,
                        name: 'FORD',
                    },
                    {
                        id: 81,
                        name: 'OPEL',
                    },
                ],
                others: response.data,
            };

            return right(faked);
        } catch (error) {
            return left(error);
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
            return left(error);
        }
    }

    async requestCartDetailsByRegsitration(registration: string): Promise<ApiResponse<CarDetails>> {
        try {
            const response = await this.get(
                `${API_URL_PREFIX}/car-details/registration/${registration}/fr`,
            );

            return right(CarDetailsMapper.toDto(response.data));
        } catch (error) {
            return left(error);
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
