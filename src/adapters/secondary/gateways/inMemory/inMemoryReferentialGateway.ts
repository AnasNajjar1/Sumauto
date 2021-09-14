import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import {
    Scope,
    ReferentialGateway,
} from '../../../../hexagon/gateways/referentialGateway.interface';
import { ReferentialItem, CarDetails, VehicleFilters, Makes } from '../../../../hexagon/interfaces';

import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { InMemoryReferential } from './stubs/referential';

export class InMemoryReferentialGateway extends BaseApi implements ReferentialGateway {
    private inMemoryReferential = {} as InMemoryReferential;

    async requestAllMakes(identifier: string): Promise<ApiResponse<Makes>> {
        try {
            return right(this.inMemoryReferential.makes);
        } catch (error) {
            return left(error as string);
        }
    }

    async requestList(
        identifier: string,
        scope: ReferentialItem,
        filters?: VehicleFilters,
    ): Promise<ApiResponse<Scope[]>> {
        switch (scope) {
            case 'model':
                return right(this.inMemoryReferential.models);

            case 'version':
                return right(this.inMemoryReferential.versions);

            case 'year':
                return right(this.inMemoryReferential.years);

            case 'month':
                return right(this.inMemoryReferential.months);

            case 'fuel':
                return right(this.inMemoryReferential.fuels);

            case 'body':
                return right(this.inMemoryReferential.bodies);

            case 'door':
                return right(this.inMemoryReferential.bodies);

            case 'gear':
                return right(this.inMemoryReferential.gears);

            case 'engine':
                return right(this.inMemoryReferential.engines);

            default:
                return left('error');
        }
    }

    async requestCartDetailsByRegsitration(registration: string): Promise<ApiResponse<CarDetails>> {
        if (registration) {
            const result: CarDetails = {
                status: true,
                makeId: this.inMemoryReferential.makes.others[0].id.toString(),
                modelId: this.inMemoryReferential.models[0].id.toString(),
                bodyId: this.inMemoryReferential.bodies[0].id.toString(),
                doors: this.inMemoryReferential.doors[0].id.toString(),
                engine: this.inMemoryReferential.engines[0].id.toString(),
                gearboxId: this.inMemoryReferential.gears[0].id.toString(),
                year: this.inMemoryReferential.years[0].id.toString(),
                month: this.inMemoryReferential.months[0].id.toString().toString(),
                fuelId: this.inMemoryReferential.fuels[0].id.toString(),
            };

            return right(result);
        }
        return left('error');
    }

    feedWith(inMemoryReferential: InMemoryReferential) {
        this.inMemoryReferential = inMemoryReferential;
    }
}
