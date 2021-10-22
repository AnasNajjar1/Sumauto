import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { AutobizPurchaseProjectDto } from '../dtos/purchaseProjectDto';

export class PurchaseProjectMapper implements Mapper<string> {
    static toAutobiz(identifier: string, purchaseProject: string): AutobizPurchaseProjectDto {
        return {
            identifier,
            purchaseProjectDelayToSell: Number(purchaseProject),
        };
    }
}
