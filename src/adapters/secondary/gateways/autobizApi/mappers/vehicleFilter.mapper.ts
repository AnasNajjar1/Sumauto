import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { CarDetails, FormVehicle, VehicleFilters } from '../../../../../hexagon/interfaces';

export class ReferentialMapper implements Mapper<CarDetails> {
    static toFilters(formVehicle: FormVehicle): VehicleFilters {
        return {
            makeId: Number(formVehicle.make),
            modelId: Number(formVehicle.model),
            month: Number(formVehicle.month),
            year: Number(formVehicle.year),
            fuelId: Number(formVehicle.fuel),
            bodyId: Number(formVehicle.body),
            gearId: Number(formVehicle.gear),
            doors: Number(formVehicle.door),
            versionId: Number(formVehicle.version),
        };
    }
}
