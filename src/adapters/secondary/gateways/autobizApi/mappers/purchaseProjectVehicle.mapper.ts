import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TVehicle } from '../../../../../hexagon/interfaces';
import { AutobizPurchaseProjectDto } from '../dtos/purchaseProjectDto';
import { AutobizRecordVehicleDto } from '../dtos/recordVehicleDto';

type SellProject = string;

export class PurchaseProjectMapper implements Mapper<SellProject> {
    static toAutobiz(identifier: string, sellProject: SellProject): AutobizPurchaseProjectDto {
        return {
            identifier,
            purchaseProjectDelay: Number(sellProject),
        };
    }
}
