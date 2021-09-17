import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { CarDetails, FormVehicle, VehicleFormFilters } from '../../../../../hexagon/interfaces';
import { ReferentialQueryParamsDto } from '../dtos/referentialQueryParamsDto';

export class ReferentialQueryParamsMapper implements Mapper<VehicleFormFilters> {
    static toDto(vehicleForm: VehicleFormFilters): ReferentialQueryParamsDto {
        return {
            monthId: Number(vehicleForm.month),
            yearId: Number(vehicleForm.year),
            fuelId: Number(vehicleForm.fuel),
            bodyId: Number(vehicleForm.body),
            gearId: Number(vehicleForm.gear),
            doors: Number(vehicleForm.door),
            // versionId: Number(vehicleForm.versionId),
            identifier: vehicleForm.identifier,
        };
    }
}
