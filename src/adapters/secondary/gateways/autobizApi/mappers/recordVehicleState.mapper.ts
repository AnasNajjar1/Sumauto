import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TVehicleState } from '../../../../../hexagon/interfaces';
import { AutobizRecordVehicleStateDto } from '../dtos/recordVehicleStateDto';

export class RecordVehicleStateMapper implements Mapper<TVehicleState> {
    static toAutobiz(
        identifier: string,
        recordUid: string,
        state: TVehicleState,
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

        let notRollingReason;
        if (state.notRollingReason === 'seriousDammage') notRollingReason = 1;
        else if (state.notRollingReason === 'accidentWithDammage') notRollingReason = 2;
        else if (state.notRollingReason === 'floodOrFire') notRollingReason = 3;

        return {
            identifier,
            recordUid,
            imported,
            service_history: serviceHistory,
            running,
            notRollingReason,
            notRollingDescription: state.notRollingDescription || undefined,
        };
    }
}
