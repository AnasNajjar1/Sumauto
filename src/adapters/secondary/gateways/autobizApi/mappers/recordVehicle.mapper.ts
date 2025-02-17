import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TJourney, TVehicle } from '../../../../../hexagon/interfaces';
import { AutobizRecordVehicleDto } from '../dtos/recordVehicleDto';

export class RecordVehicleMapper implements Mapper<TVehicle> {
    static toAutobiz(
        identifier: string,
        offer: TJourney,
        recordVehicle: TVehicle,
    ): AutobizRecordVehicleDto {
        return {
            identifier,
            offer,
            makeId: Number(recordVehicle.make),
            modelId: Number(recordVehicle.model),
            month: Number(recordVehicle.month),
            year: Number(recordVehicle.year),
            fuelId: Number(recordVehicle.fuel),
            bodyId: Number(recordVehicle.body),
            doors: Number(recordVehicle.door),
            gearId: Number(recordVehicle.gear),
            engine: Number(recordVehicle.engine),
            versionId: Number(recordVehicle.version),
            mileage: Number(recordVehicle.mileage),
        };
    }
}
