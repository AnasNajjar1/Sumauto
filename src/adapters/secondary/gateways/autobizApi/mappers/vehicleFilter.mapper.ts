import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { CarDetails, FormVehicle } from '../../../../../hexagon/interfaces';

export class ReferentialMapper implements Mapper<CarDetails> {
    // static toFilters(formVehicle: FormVehicle):  {
    //     return {
    //         make: Number(formVehicle.make),
    //         model: Number(formVehicle.model),
    //         monthId: Number(formVehicle.month),
    //         yearId: Number(formVehicle.year),
    //         fuelId: Number(formVehicle.fuel),
    //         bodyId: Number(formVehicle.body),
    //         gearId: Number(formVehicle.gear),
    //         doors: Number(formVehicle.door),
    //         versionId: Number(formVehicle.version),
    //     };
    // }
}
