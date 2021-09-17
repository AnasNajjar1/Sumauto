import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { VehicleStateInformation } from '../../../../../hexagon/interfaces';
import { AutobizRecordVehicleStateDto } from '../dtos/recordVehicleStateDto';

export class RecordVehicleStateMapper implements Mapper<VehicleStateInformation> {
    static toAutobiz(
        identifier: string,
        recordId: number,
        state: VehicleStateInformation,
    ): AutobizRecordVehicleStateDto {
        return {
            identifier,
            recordId,
            imported: state.imported === '1',
            service_history: state.history === '1',
            running: Number(state.running),
        };
    }
}
