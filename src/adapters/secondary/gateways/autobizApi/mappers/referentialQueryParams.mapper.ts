import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { VehicleFormFilters } from '../../../../../hexagon/interfaces';
import { AutobizReferentialQueryParamsDto } from '../dtos/referentialQueryParamsDto';

export class ReferentialQueryParamsMapper implements Mapper<VehicleFormFilters> {
    static toAutobiz(vehicleForm: VehicleFormFilters): AutobizReferentialQueryParamsDto {
        return {
            monthId: Number(vehicleForm.month),
            yearId: Number(vehicleForm.year),
            fuelId: Number(vehicleForm.fuel),
            bodyId: Number(vehicleForm.body),
            gearId: Number(vehicleForm.gear),
            doors: Number(vehicleForm.door),
            engine: Number(vehicleForm.engine),
            identifier: vehicleForm.identifier,
        };
    }
}
