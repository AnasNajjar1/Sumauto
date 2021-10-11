import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { VehicleStateInformation } from '../../../../../hexagon/interfaces';
import { AutobizRecordVehicleStateDto } from '../dtos/recordVehicleStateDto';

export class RecordVehicleStateMapper implements Mapper<VehicleStateInformation> {
    static toAutobiz(
        identifier: string,
        recordUid: string,
        state: VehicleStateInformation,
    ): AutobizRecordVehicleStateDto {
        let imported;
        if (state.imported === 'yes') imported = true;
        else if (state.imported === 'no') imported = false;

        let serviceHistory;
        if (state.history === 'yes') serviceHistory = true;
        else if (state.history === 'no') serviceHistory = false;

        let running;
        if (state.running === 'yes') running = 1;
        else if (state.running === 'no') running = 3;

        return {
            identifier,
            recordUid,
            imported,
            service_history: serviceHistory,
            running,
        };
    }
}
