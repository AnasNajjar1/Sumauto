import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { AutobizPurchaseProjectDto } from '../dtos/purchaseProjectDto';

type SellProject = string;

export class PurchaseProjectMapper implements Mapper<SellProject> {
    static toAutobiz(identifier: string, sellProject: SellProject): AutobizPurchaseProjectDto {
        return {
            identifier,
            purchaseProjectDelay: Number(sellProject),
        };
    }
}
