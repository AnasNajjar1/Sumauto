/*eslint-disable */
import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import {
    Scope,
    ReferentialGateway,
} from '../../../../hexagon/gateways/referentialGateway.interface';
import {
    TReferentialItem,
    CarDetails,
    Makes,
    VehicleFormFilters,
    UpdateStatus,
} from '../../../../hexagon/interfaces';

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
        scope: TReferentialItem,
        filters?: VehicleFormFilters,
    ): Promise<ApiResponse<Scope[]>> {
        switch (scope) {
            case 'make':
                let data: any = Array.isArray(this.inMemoryReferential.makes) ? this.inMemoryReferential.makes : [this.inMemoryReferential.makes];
                data.preferred = data[0].preferred;
                data.others = data[0].others;
                data.all = [...data[0].preferred, ...data[0].others];
                return right(data);

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
                make: this.inMemoryReferential.makes.others[0].id.toString(),
                makeName: this.inMemoryReferential.makes.others[0].name,
                model: this.inMemoryReferential.models[0].id.toString(),
                modelName: this.inMemoryReferential.models[0].name,
                body: this.inMemoryReferential.bodies[0].id.toString(),
                bodyName: this.inMemoryReferential.bodies[0].name,
                door: this.inMemoryReferential.doors[0].id.toString(),
                engine: this.inMemoryReferential.engines[0].id.toString(),
                gear: this.inMemoryReferential.gears[0].id.toString(),
                gearName: this.inMemoryReferential.gears[0].name,
                year: this.inMemoryReferential.years[0].id.toString(),
                month: this.inMemoryReferential.months[0].id.toString(),
                monthName: 'septiembre',
                fuel: this.inMemoryReferential.fuels[0].id.toString(),
                fuelName: this.inMemoryReferential.fuels[0].name,
            };

            return right(result);
        }
        return left('error');
    }

    feedWith(inMemoryReferential: InMemoryReferential) {
        this.inMemoryReferential = inMemoryReferential;
    }

    async checkZipCode(identifier: string, zipCode: string): Promise<ApiResponse<UpdateStatus>> {
        if (Number(zipCode) > 50000) return right({ status: true });
        else return left('unknown_zipcode');
    }
}
